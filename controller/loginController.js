const { sendGeneralResponse } = require("../utils/responseHelper");

 
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

module.exports = { login };
