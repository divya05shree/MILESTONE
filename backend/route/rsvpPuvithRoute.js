
const express = require('express');
const router = express.Router();
const rsvpController = require('../controller/PuvithController');


router.get('/priority', rsvpController.getPriorityRSVPs);
router.get('/stats', rsvpController.getRSVPStats);


module.exports = router;
