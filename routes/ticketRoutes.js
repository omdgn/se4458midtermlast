const express = require('express');
const { buyTicket, checkIn } = require('../controllers/ticketController');
const router = express.Router();

router.post('/buy', buyTicket); 
router.post('/checkin', checkIn); 

module.exports = router;
