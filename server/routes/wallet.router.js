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
  const { cardType, accountNumber, expirationDate, securityCode, billingAddress } = req.body;
  
  const insertBankDetailsQuery = `
    INSERT INTO bank_details (card_type, account_number, expiration_date, security_code, billing_address)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  pool.query(insertBankDetailsQuery, [cardType, accountNumber, expirationDate, securityCode, billingAddress])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding bank details to database', error);
      res.sendStatus(500);
    });
});

module.exports = router;
