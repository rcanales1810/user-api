const { isValidName, isValidEmail } = require("../utils/validators");

const validateUserBody = (req, res, next) => {
    const { name, email } = req.body;

    if (!isValidName(name)) {
        return res.status(400).json({
            message: "El nombre es obligatorio"
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            message: "El correo no tiene el formato correcto: user@mail.com"
        });
    }

    next();
};

module.exports = validateUserBody;