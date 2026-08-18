const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
    const result = await pool.query(
        `SELECT 
            id,
            name,
            email,
            is_active
         FROM users 
         ORDER BY id`
    );

    return result.rows;
};

const getActiveUsers = async () => {
    const result = await pool.query(
        `SELECT 
            id,
            name,
            email,
            is_active
        FROM users 
        WHERE is_active = TRUE
        ORDER BY id`
    );

    return result.rows;
};

const createNewUser = async (name, email, password) => {
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash) 
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [name, email, passwordHash]
    );

    return result.rows[0];
};

const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT  
            id,
            name,
            email,
            is_active 
        FROM users
        WHERE id = $1 
        AND is_active = TRUE`,
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
};

const deleteUser = async (id) => {
    const result = await pool.query(
        `UPDATE users
        SET is_active = FALSE
        WHERE id = $1
        RETURNING *`,
        [id]
    );

    return result.rows[0];
};

const patchUser = async (name, email, id) => {
    const fields = [];
    const values = [];
    let parameterIndex = 1;

    if (name !== undefined) {
        fields.push(`name = $${parameterIndex}`);
        values.push(name);
        parameterIndex++;
    }

    if (email !== undefined) {
        fields.push(`email = $${parameterIndex}`);
        values.push(email);
        parameterIndex++;
    }

    values.push(id);

    const result = await pool.query(
        `UPDATE users
        SET ${fields.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING *`,
        values
    );

    return result.rows[0];
};

module.exports = {
    getAllUsers,
    getActiveUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser,
    patchUser
};