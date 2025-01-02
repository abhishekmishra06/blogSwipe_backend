 const jwt = require('jsonwebtoken');


const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  };
  
  const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });  
  };



  module.exports = { generateAccessToken, generateRefreshToken  } 
