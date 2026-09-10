const {   
    hasPatchFields, 
    isValidPatchEmail 
} = require("../utils/validators");

const validatePatchUserBody = (req, res, next) => {
    const { name, email } = req.body;

    if (!hasPatchFields(name, email)) {
        return res.status(400).json({
            message: "At least one field must be provided"
        });
    }

    if (isValidPatchEmail(email)) {
        return res.status(400).json({
            message: "Invalid email format: user@mail.com"
        });
    }

    next();
};

module.exports = validatePatchUserBody;