import { request } from "express";
import { pool } from '../db.js'

export const getUsers = async (req, res) => {
    const [ rows ] = await pool.query('SELECT * FROM users');
    res.send(rows)
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    const [ rows ] = await pool.query('SELECT * FROM users WHERE id = ?', [ id ]);
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'User not found'
    });
    
    res.json(rows[0])
};

export const createUser = async (req, res) => {
    const { name, paternal_surname, maternal_surname, email, password, secret, users_types } = req.body;
    const [ rows ] = await pool.query(`INSERT INTO users 
    (name, paternal_surname, maternal_surname, email, password, secret, users_types) 
    VALUES (?,?,?,?,?,?,?)`,[ name, paternal_surname, maternal_surname, email, password, secret, users_types ]);
    //console.log(req.body);
    res.send({ 
        id: rows.insertId,
        name,
        paternal_surname,
        maternal_surname,
        email,
        password,
        secret,
        users_types 
    })
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, paternal_surname, maternal_surname, email, password, secret, users_types } = req.body;
    
    const [ result ] = await pool.query(`UPDATE users SET name = IFNULL(?, name), 
    paternal_surname = IFNULL(?, paternal_surname), maternal_surname = IFNULL(?, maternal_surname), 
    email = IFNULL(?, email), password = IFNULL(?, password), secret = IFNULL(?, secret), 
    users_types = IFNULL(?, users_types) WHERE id = ?`, 
    [ name, paternal_surname, maternal_surname, email, password, secret, users_types, id ]);

    /*const [ result ] = await pool.query(`UPDATE users SET name = ?, paternal_surname = ?, maternal_surname = ?, email = ?, 
    password = ?, secret = ?, users_types = ? WHERE id = ?`, 
    [ name, paternal_surname, maternal_surname, email, password, secret, users_types, id ]);*/
    
    if (result.affectedRows === 0) return res.status(404).json({
        message: 'User not found'
    });

    const [ rows ] = await pool.query('SELECT * FROM users WHERE id = ?', [ id ]);
    res.json(rows[0])

};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const [ result ] = await pool.query('DELETE FROM users WHERE id = ?', [ id ]);
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'User not found'
    });
    
    

    res.sendStatus(204)
};