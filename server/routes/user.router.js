const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});


//considering all the register input fields
router.post('/register', (req, res, next) => {
  const { username, first_name, last_name, email, password, confirm_password } = req.body;
  console.log("server says hi to", username, first_name, last_name, email, password, confirm_password)
  if (password !== confirm_password) {
    res.status(400).send('Passwords do not match');
    return;
  }
  const encryptedPassword = encryptLib.encryptPassword(password);
  const encryptedconfirm_password = encryptLib.encryptPassword(confirm_password);

  const queryText = `INSERT INTO "user_info" (username, first_name, last_name, email, password, confirm_password)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [username, first_name, last_name, email, encryptedPassword, encryptedconfirm_password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration has failed: ', err);
      res.sendStatus(500);
    });
});




// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
