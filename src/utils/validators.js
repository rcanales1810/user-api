//Regex = regular expression, es un patrón de búsqueda para una cadena de texto. Aquí, se busca que el correo tenga el 
//formato usual de los correos. 
// ^ marca el inicio de la expresión y $ el final
// [ ] lo que esté dentro son los caracteres permitidos, pero ^ indica negación, por lo que están "prohibidos" los \s, que 
//son espacios en blanco, y @
//el + indica que es más de un caracter con la misma condición
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidName = (name) => {
    return typeof name === "string" && name.trim().length > 0;
};

const hasNoPatchFields = (name, email) => {
    return name === undefined && email === undefined;
}

const isValidPatchEmail = (email) => {
    return email !== undefined && !isValidEmail(email);
}


module.exports = {
    isValidEmail,
    isValidName,
    hasNoPatchFields,
    isValidPatchEmail
};