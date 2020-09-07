const express = require('express');
const router = express.Router();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.MODE && process.env.MODE == 'production' ? process.env.DBHOST : 'localhost',
    user: process.env.MODE && process.env.MODE == 'production' ? process.env.DBUSER : 'root',
    password: process.env.MODE && process.env.MODE == 'production' ? process.env.DBPASS : '',
    connectionLimit: 5
});

const dbname = process.env.MODE && process.env.MODE == 'production' ? 'employees' : 'employees';

router.get('/avg-salaries', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(`
            SELECT AVG(A.salary) AS avg_salary, C.title
            FROM ${dbname}.salaries A
            JOIN (
                SELECT emp_no, salary, MAX(to_date) AS to_date
                FROM ${dbname}.salaries 
                GROUP BY emp_no    
            ) B
            ON A.emp_no = B.emp_no 
            AND A.to_date = B.to_date
            JOIN ${dbname}.titles C 
            ON A.emp_no = C.emp_no
            GROUP BY C.title
        `);
        conn.end();
        res.send(response);
    }
    catch (err) {
        console.log(err);
        if (conn) {
            conn.end();
        }
        res.send(err);
    }
});

router.get('/avg-ages', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(`
            SELECT B.title, AVG(TIMESTAMPDIFF(year, A.birth_date, NOW())) AS avg_age
            FROM ${dbname}.employees A
            JOIN ${dbname}.titles B 
            ON A.emp_no = B.emp_no
            GROUP BY B.title
        `);
        conn.end();
        res.send(response);
    }
    catch (err) {
        if (conn) {
            conn.end();
        }
        res.send(err);
    }
});

router.get('/avg-age', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(`
            SELECT emp_no, birth_date, AVG(TIMESTAMPDIFF(year, birth_date, NOW())) AS avg_age
            FROM ${dbname}.employees
        `);
        conn.end();
        res.send(response);
    }
    catch (err) {
        if (conn) {
            conn.end();
        }
        res.send(err);
    }
});

module.exports = router;
