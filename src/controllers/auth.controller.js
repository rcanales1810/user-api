const authService = require("../services/auth.service");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Correo y contraseña son obligatorios"
            });
        }

        const user = await authService.login(email, password);

        if (!user) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        res.status(200).json({
            message: "Login exitoso",
            user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};