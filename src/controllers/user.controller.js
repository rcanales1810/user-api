const userService = require("../services/user.service");
const { isValidEmail } = require("../utils/validators");

const getUsers = async (req, res) => {
    const { includeInactive } = req.query;
    const shouldIncludeInactive = includeInactive === "true";

    let users;

    if (shouldIncludeInactive) {
        users = await userService.getAllUsers();
    } else {
        users = await userService.getActiveUsers();
    }

    return res.status(200).json(users);
};

const createNewUser = async (req, res) => {

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
};

const getUserById = async (req, res, next) => {
    const user = await userService.getUserById(req.userId);
    //El 404 va FUERA DEL CATCH porque no es un error de conexión ni de sintaxis ni de la BD. TODO está bien, pero no se encontró el id buscado
    if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }

    res.status(200).json({
        user
    });
};

const updateUser = async (req, res, next) => {
    //Obtener el id, user y email
    const { name, email } = req.body;

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
    const user = await userService.getUserById(req.userId);

    if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }

    //Llamar al servicio para actualizar
    const updatedUser = await userService.updateUser(name, email, req.userId);

    res.status(200).json({
        updatedUser
    });
};

const deleteUser = async (req, res, next) => {
    const user = await userService.getUserById(req.userId);

    if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }

    const deletedUser = await userService.deleteUser(req.userId);

    res.status(200).json({
        deletedUser
    });
};

const patchUser = async (req, res, next) => {
    const { name, email } = req.body;

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

    const user = await userService.getUserById(req.userId);

    if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }

    const patchedUser = await userService.patchUser(name, email, req.userId);

    res.status(200).json({
        patchedUser
    });
};

module.exports = {
    getUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser,
    patchUser
};