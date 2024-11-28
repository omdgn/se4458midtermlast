const express = require('express');
const { queryFlights } = require('../controllers/flightController');
const router = express.Router();

router.get('/', queryFlights); 

module.exports = router;
