const userService = require("../services/user.service");

//Método para jalar la lista de usuarios usando SQL
const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

//funcion para crear usuarios y agregarlos al array
const createNewUser = async (req, res) => {

    try {
        const { name, email } = req.body;

        //Regex = regular expression, es un patrón de búsqueda para una cadena de texto. Aquí, se busca que el correo tenga el 
        //formato usual de los correos. 
        // ^ marca el inicio de la expresión y $ el final
        // [ ] lo que esté dentro son los caracteres permitidos, pero ^ indica negación, por lo que están "prohibidos" los \s, que 
        //son espacios en blanco, y @
        //el + indica que es más de un caracter con la misma condición
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        if (!emailRegex.test(email)) {
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
}

module.exports = {
    getUsers,
    createNewUser
};
