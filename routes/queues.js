const express = require('express');
const router = express.Router();
const kue = require('kue');

let queue;
if (process.env.MODE && process.env.MODE === 'production') {
    queue = kue.createQueue({
        prefix: 'q',
        redis: {
            port: 30069,
            host: 'ec2-3-210-34-241.compute-1.amazonaws.com',
            auth: 'pcf4d560cccf15e9a487097fec2cbcef748eb8e9712556323f79d936ea999aa0b',
            db: 3, // if provided select a non-default redis db
            options: {
                // see https://github.com/mranney/node_redis#rediscreateclient
            }
        }
    });
}
else {
    queue = kue.createQueue();
}

const generateEmployeeAbsences = require('../scripts/employee-absence');
const generateEmployeeLeaves = require('../scripts/employee-leaves');
const updateEmployeeSalaries = require('../scripts/employee-salary');

router.get('/enqueue', (req, res) => {
    queue
        .create('employee-absences', { title: 'Generate Employee Absences' })
        .save();

    queue
        .create('employee-leaves', { title: 'Generate Employee Leaves' })
        .save();

    queue
        .create('employee-salary', { title: 'Update Employee Salaries' })
        .save();

    res.send('Queues generated');
});

router.get('/process', (req, res) => {
    queue.process('employee-absences', (job, done) => {
        req.app.io.emit('queue', job.data.title);
        generateEmployeeAbsences(err => {
            if (err) {
                console.log(err);
                done(err);
            }
            else {
                done();
                queue.process('employee-leaves', (job, done) => {
                    req.app.io.emit('queue', job.data.title);
                    generateEmployeeLeaves(err => {
                        if (err) {
                            console.log(err);
                            done(err);
                        }
                        else {
                            done();
                            queue.process('employee-salary', (job, done) => {
                                req.app.io.emit('queue', job.data.title);
                                updateEmployeeSalaries(err => {
                                    if (err) {
                                        console.log(err);
                                        done(err);
                                    }
                                    else {
                                        done();
                                        return 'success';
                                    }
                                }, numEmployeesProcessed => {
                                    req.app.io.emit('progress', numEmployeesProcessed);
                                });
                            });
                        }
                    }, numEmployeesProcessed => {
                        req.app.io.emit('progress', numEmployeesProcessed);
                    })
                });
            }
        }, numEmployeesProcessed => {
            req.app.io.emit('progress', numEmployeesProcessed);
        });
    });
    res.send('Processing queues');
});

router.get('/process-absences', (req, res) => {
    res.send('Processing absences queue');
});

router.get('/process-leaves', (req, res) => {
    res.send('Processing leaves queue');
});

router.get('/process-salaries', (req, res) => {
    res.send('Processing salaries queue');
});

router.use('/kue-api/', kue.app);

module.exports = router;