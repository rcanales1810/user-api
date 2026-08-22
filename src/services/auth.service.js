const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    const { password_hash, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token
    };
};

module.exports = {
    login
};