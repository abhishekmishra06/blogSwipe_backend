const user = require("../models/user_model");
const { sendGeneralResponse } = require("../utils/responseHelper");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const { validateEmail, validateRequiredFields } = require("../utils/validators");
const { verifyRegisterEmailOtp } = require("./blog/otpController");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


const LOGIN_CREDENTIALS = {
  email: "admin@example.com",   
  password: "password123"      
};

const login = async (req, res) => {
  if (!req.body) {
    return sendGeneralResponse(res, false, "Request body is missing", 400);
  }

  const { email, password } = req.body;

  if (!email) {
    return sendGeneralResponse(res, false, "Email is required", 400);
  }

  if (!password) {
    return sendGeneralResponse(res, false, "Password is required", 400);
  }

  try {
    // Check if the email and password match the fixed credentials
    if (email === LOGIN_CREDENTIALS.email && password === LOGIN_CREDENTIALS.password) {
      sendGeneralResponse(res, true, "Login successful", 200);
    } else {
      sendGeneralResponse(res, false, "Invalid email or password", 401);
    }
  } catch (error) {
    console.error("Error during login:", error);
    sendGeneralResponse(res, false, "Internal server error", 500);
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email) {
      return sendGeneralResponse(res, false, "Email is required", 400);
  }

  if (!password) {
    return sendGeneralResponse(res, false, "Password field is required", 400);
  }
 

  if (!validateEmail(email)) {
    return sendGeneralResponse(res, false, 'Invalid email', 400);
}

  

  try {
    const User = await user.findOne({email});

    if (!User) {
      return sendGeneralResponse(res, false, 'User not registered', 400);
    }

    const isMatch = await bcrypt.compare(password,User.password);

    if (isMatch) {
      const accessToken = generateAccessToken( User._id);
      const refreshToken = generateRefreshToken( User._id);

      User.refreshToken = refreshToken;

       await User.updateOne({ _id: User._id }, { $set: { refreshToken } });

       const { password, ...userdata } = User._doc;  

      return sendGeneralResponse(res, true, 'Login successful', 200, { ...userdata , accessToken, refreshToken });
    } else {
      return sendGeneralResponse(res, false, 'Invalid password', 400);
    }
  } catch (error) {
    console.error('Login error:', error);
    return sendGeneralResponse(res, false, "Internal server error", 500);
  }
};


const registerUser = async (req, res) => {
  if (!req.body) {
      return sendGeneralResponse(res, false, 'Request body is missing', 400);
  }
  const { userName, email, password , otp } = req.body;
  const requiredFields = {  userName, email, password,  otp };

  const validationResult = validateRequiredFields(res, requiredFields);
  if (validationResult !== true) return;

  if (!validateEmail(email)) {
      return sendGeneralResponse(res, false, 'Invalid email', 400);
  }

  try {
      const existingUser = await user.findOne( {email} );
      if (existingUser) {
          return sendGeneralResponse(res, false, 'email already registered', 400);
      }

      const otpVerificationResult = await verifyRegisterEmailOtp(email, otp);
      if (!otpVerificationResult.status) {
        return sendGeneralResponse(res, false, otpVerificationResult.message, 400);
      }

       const hashedPassword = await bcrypt.hash(password, 10);
      

      const User = new user({
          userName,
          email,
          password: hashedPassword,
          registrationComplete: false,
          
      });


      const accessToken = generateAccessToken(User._id);
      const refreshToken = generateRefreshToken(User._id);


      User.refreshToken = refreshToken;

      await User.save();

      sendGeneralResponse(res, true, 'Shop registered successfully. Please complete the registration.', 200, { User , accessToken});

  } catch (error) {
      console.error('User registration error:', error);
      sendGeneralResponse(res, false, 'Internal server error', 500);
  }
};

module.exports = { login , registerUser ,loginUser };
