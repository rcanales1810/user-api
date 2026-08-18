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

    const { name, email, password } = req.body;

    //validación de los datos ingresados
    //"si name o email son falsos", o sea, si uno o el otro están vacios
    if (!name || !email || !password) {
        //Los códigos 4xx significan errores del cliente, en síntesis, el cliente hizo algo mal. En este caso
        //no ha completado campos obligatorios. Sería bueno hacer que en la tabla en la BD estos campos sean NOT NULL
        return res.status(400).json({
            message: "Nombre, correo y clave son olbigatorios"
        });
    }

    const user = await userService.createNewUser(name, email, password);

    res.status(201).json({
        message: "Usuario creado correctamente",
        user
    });
};

const getUserById = async (req, res) => {
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

const updateUser = async (req, res) => {
    //Obtener el id, user y email
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Ambos campos son obligatorios"
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

const deleteUser = async (req, res) => {
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

const patchUser = async (req, res) => {
    const { name, email } = req.body;

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