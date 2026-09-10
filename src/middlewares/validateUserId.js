const validateUserId = (req, res, next) =>{

        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                message: "ID is invalid. ID must be a positive integer"
            });
        }

        req.userId = userId;

        next();
};

module.exports = validateUserId;