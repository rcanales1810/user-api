const userService = require("../services/user.service");
const { isValidEmail } = require("../utils/validators");

const getUsers = async (req, res) => {
    try {
        const { includeInactive } = req.query;
        const shouldIncludeInactive = includeInactive === "true";

        let users;

        if (shouldIncludeInactive) {
            users = await userService.getAllUsers();
        } else {
            users = await userService.getActiveUsers();
        }

        return res.status(200).json(users);
    } catch {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

const createNewUser = async (req, res) => {

    try {
        const { name, email } = req.body;

        //validación de los datos ingresados
        //"si name o email son falsos", o sea, si uno o el otro están vacios
        if (!name || !email) {
            //Los códigos 4xx significan errores del cliente, en síntesis, el cliente hizo algo mal. En este caso
            //no ha completado campos obligatorios. Sería bueno hacer que en la tabla en la BD estos campos sean NOT NULL
            return res.status(400).json({
                message: "Ambos campos son obligatorios"
            });
        }

        //verificar que el formato del correo sea correcto 
        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "El correo no tiene el formato correcto: user@mail.com"
            });
        }

        const user = await userService.createNewUser(name, email);

        res.status(201).json({
            message: "Usuario creado correctamente",
            user
        });

    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "Ese correo ya está registrado"
            })
        }

        console.error(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    };
};

const getUserById = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await userService.getUserById(userId);
        //El 404 va FUERA DEL CATCH porque no es un error de conexión ni de sintaxis ni de la BD. TODO está bien, pero no se encontró el id buscado
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        //Obtener el id, user y email
        const { name, email } = req.body;
        const userId = Number(req.params.id);

        if (!name || !email) {
            return res.status(400).json({
                message: "Ambos campos son obligatorios"
            });
        }

        //despues, validar que los datos a actualizar sean correctos
        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "El correo no tiene el formato correcto: user@mail.com"
            });
        }

        //verificar si existe el usuario a actualizar
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        //Llamar al servicio para actualizar
        const updatedUser = await userService.updateUser(name, email, userId);

        res.status(200).json({
            updatedUser
        });

    } catch (error) {

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Ese correo ya está registrado"
            })
        }

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }

};

const deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const deletedUser = await userService.deleteUser(userId);

        res.status(200).json({
            deletedUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

const patchUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = Number(req.params.id);

        if (name === undefined && email === undefined) {
            return res.status(400).json({
                message: "Debes proporcionar al menos un campo para actualizar"
            });
        }

        if (email !== undefined && !isValidEmail(email)) {
            return res.status(400).json({
                message: "El correo no tiene el formato correcto: user@mail.com"
            });
        }

        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const patchedUser = await userService.patchUser(name, email, userId);

        res.status(200).json({
            patchedUser
        });

    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "Ese correo ya está registrado"
            })
        }

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

module.exports = {
    getUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser,
    patchUser
};