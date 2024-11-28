const express = require('express');
const { insertFlight, getFlightReport } = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/flights', authenticate, insertFlight);
router.post('/creports', authenticate, getFlightReport);

module.exports = router;
