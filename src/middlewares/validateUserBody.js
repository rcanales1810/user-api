const { isValidName, isValidEmail } = require("../utils/validators");

const validateUserBody = (req, res, next) => {
    const { name, email } = req.body;

    if (!isValidName(name)) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            message: "Invalid email format: user@mail.com"
        });
    }

    next();
};

module.exports = validateUserBody;