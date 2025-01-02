const { sendGeneralResponse } = require('./responseHelper');

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};






// validate empety fields
function validateRequiredFields(res, fields) {
     for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            return sendGeneralResponse(res, false, `${key} field is required`, 400);
        }
    }
    return true;
}

module.exports = {
    validateEmail,
    validateRequiredFields
};
