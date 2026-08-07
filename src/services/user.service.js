const pool = require("../config/db");

const getAllUsers = async () => {
    const result = await pool.query(
        "SELECT * FROM users ORDER BY id"
    );

    return result.rows;
};

const createNewUser = async (name, email) => {
    const result = await pool.query(
        `INSERT INTO users (name, email) 
        VALUES ($1, $2)
        RETURNING *;`,
        [name, email]
    );

    return result.rows[0];
};

const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT * 
        FROM users
        WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const updateUser = async (name, email, id) => {
    const result = await pool.query(
        `UPDATE users
        SET name = $1, email = $2
        WHERE id = $3
        RETURNING *`,
        [name, email, id]
    );

    return result.rows[0];
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUser
};