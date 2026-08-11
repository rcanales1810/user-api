const {   
    hasNoPatchFields, 
    isValidPatchEmail 
} = require("../utils/validators");

const validatePatchUserBody = (req, res, next) => {
    const { name, email } = req.body;

    if (hasNoPatchFields(name, email)) {
        return res.status(400).json({
            message: "Debe ingresarse mínimo uno de los campos"
        });
    }

    if (isValidPatchEmail(email)) {
        return res.status(400).json({
            message: "El correo no tiene el formato correcto: user@mail.com"
        });
    }

    next();
};

module.exports = validatePatchUserBody;