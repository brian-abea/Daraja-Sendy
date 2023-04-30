const express = require('express');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');


const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route for adding bank details
 */
router.post('/', (req, res) => {
  const { name, accountNumber, description, priority, } = req.body;
  console.log("Wallet added", name, accountNumber, description, priority )

  ;

  const insertWalletQuery = `
    INSERT INTO wallet (name, accountNumber, description, priority)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  pool.query(insertWalletQuery, [name, accountNumber, description, priority ])
    .then((result) => {
      res.sendStatus(201);
      console.log("value inserted successfully !")
    })
    .catch((error) => {
      console.log('Error creating wallet ', error);
      res.sendStatus(500);
    });
});


module.exports = router;
