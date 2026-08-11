const validateUserId = (req, res, next) =>{

        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                message: "ID inválido. El ID debe ser un entero positivo"
            });
        }

        req.userId = userId;

        next();
};

module.exports = validateUserId;