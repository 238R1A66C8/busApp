const express = require('express');
const { driverLogin, driverRegister } = require('../controllers/authController');

const router = express.Router();

router.post('/register', driverRegister);
router.post('/login', driverLogin);

module.exports = router;
