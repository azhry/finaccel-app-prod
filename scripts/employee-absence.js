const mariadb = require('mariadb');
const Stream = require('stream');
const {
    getRandomInt,
    getStartDate,
    getEndDate
} = require('../helpers');

const pool = mariadb.createPool({
    host: process.env.MODE && process.env.MODE == 'production' ? process.env.DBHOST : 'localhost',
    user: process.env.MODE && process.env.MODE == 'production' ? process.env.DBUSER : 'root',
    password: process.env.MODE && process.env.MODE == 'production' ? process.env.DBPASS : '',
    connectionLimit: 5
});

const dbname = process.env.MODE && process.env.MODE == 'production' ? 'employees' : 'employees';

module.exports = async function employeesStream(cb, processCb = () => {}) {
    let conn;
    try {
        conn = await pool.getConnection();

        const queryStream = await conn.queryStream(`SELECT emp_no, hire_date FROM ${dbname}.employees`);

        let numEmployeesProcessed = 0;
        const transformStream = new Stream.Transform({
            objectMode: true,
            transform: async function transformer(chunk, encoding, callback) {
                const batch = [];
                for (let i = 0; i < 90; i++) {
                    const startDate = getStartDate(chunk.hire_date, i);
                    const endDate = getEndDate(chunk.hire_date, i);
                    batch.push([chunk.emp_no, startDate, endDate, getRandomInt(0, 90)]);
                }

                conn.beginTransaction();
                try {
                    await conn.batch(`INSERT INTO ${dbname}.daily_employee_absences(emp_no, start_date, end_date, break_time) VALUES(?, ?, ?, ?)`, batch);
                    conn.commit();
                }
                catch (err) {
                    conn.rollback();
                    console.log(error);
                }

                numEmployeesProcessed++;
                if (numEmployeesProcessed % 100 == 0) {
                    processCb(numEmployeesProcessed);
                }
                callback();
            },
        });

        Stream.pipeline(
            queryStream, 
            transformStream, 
            err => cb(err));

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        };
    }
};