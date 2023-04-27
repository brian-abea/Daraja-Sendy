const express = require('express');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

/**
 * POST route for retrieving bank details
 */
router.get('/', (req, res) => {
  const selectBankDetailsQuery = `
    SELECT *
    FROM bank_details
  `;

  pool.query(selectBankDetailsQuery)
    .then((result) => {
      res.status(200).json(result.rows);
      console.log("results here", result.rows)
    })
    .catch((error) => {
      console.log('Error retrieving bank details from database', error);
      res.sendStatus(500);
    });
});

module.exports = router;
