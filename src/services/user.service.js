const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
    const result = await pool.query(
        `SELECT 
            *
         FROM users 
         ORDER BY id`
    );

    const userWithoutPassword = result.rows.map(
        ({ password_hash, ...user }) => user
    );

    return userWithoutPassword;
};

const getActiveUsers = async () => {
    const result = await pool.query(
        `SELECT 
            *
        FROM users 
        WHERE is_active = TRUE
        ORDER BY id`
    );

    const userWithoutPassword = result.rows.map(
        ({ password_hash, ...user }) => user
    );

    return userWithoutPassword;
};

const createNewUser = async (name, email, password) => {
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash) 
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [name, email, passwordHash]
    );

    const user = result.rows[0];

    const { password_hash, ...userWithoutPassword } = user;

    return userWithoutPassword;
};

const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT  
            *
        FROM users
        WHERE id = $1 
        AND is_active = TRUE`,
        [id]
    );

    const user = result.rows[0];

    if (!user) {
        return null;
    }

    const { password_hash, ...userWithoutPassword } = user;

    return userWithoutPassword;
};

const updateUser = async (name, email, id) => {
    const result = await pool.query(
        `UPDATE users
        SET name = $1, email = $2
        WHERE id = $3
        RETURNING *`,
        [name, email, id]
    );

    const user = result.rows[0];

    const { password_hash, ...userWithoutPassword } = user;

    return userWithoutPassword;
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