const pool = require("../config/db");
const bcrypt = require("bcrypt");

const login = async (email, password) => {

    const result = await pool.query(
        `SELECT *
        FROM users
        WHERE email= $1
        AND is_active = TRUE`,
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        return null
    }

    const {password_hash, ...safeUSer} = user;

    return safeUSer;
};

module.exports = {
    login
};