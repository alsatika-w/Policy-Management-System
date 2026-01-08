import pool from "../config/db.js";

// Insert new user to database
export const createUser = async (username, password, role) => {
    const result = await pool.query(
        `
        INSERT INTO users (username, password, role)
        Values ($1, $2, $3)
        RETURNING id, username, role
        `,
        [username, password, role]
    );
    result.rows[0];
};


/**
 * Take user from username
 * use for login
 */
export const findUserByUsername = async (username) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
    );
    return result.rows[0];
};
