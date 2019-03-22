const express = require('express');
const router = express.Router();
const pool = require('./pool');

// Retrieve table data from database and send to client
router.get('/', (req, res) => {
   pool.query(`SELECT * FROM "toDoTable"`)
      .then((response) => {
         res.send(response.rows);
      }).catch((error) => {
         console.log('Error retrieving data from table', error);
         res.sendStatus(500);
      });
});

// Retrieve data from client and sent to database to be added to table
router.post('/', (req, res) => {
   let task = req.body;
   let sqlText = `INSERT INTO "toDoTable" ("task", "is_complete")
   VALUES ($1, $2);`;

   pool.query(sqlText, [task.task, false])
      .then(() => {
         res.sendStatus(201);
      }).catch((error) => {
         console.log('Error adding data to table', error);
         res.sendStatus(500);
      });
});
