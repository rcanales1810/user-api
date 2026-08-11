const errorHandler = (error, req, res, next) => {
    console.error(error);

    if (error.code === "23505") {
        return res.status(409).json({
            message: "Ese correo ya está registrado"
        });
    }

    return res.status(500).json({
        message: "Error interno del servidor"
    });
};

module.exports = errorHandler;