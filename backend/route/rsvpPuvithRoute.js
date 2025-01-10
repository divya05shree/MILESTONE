
const express = require('express');
const router = express.Router();
const rsvpController = require('../controller/PuvithController');

//Priority based output 
router.get('/priority', rsvpController.getPriorityRSVPs);

// Stats about the number of users 
router.get('/stats', rsvpController.getRSVPStats);

router.get("/all", rsvpController.getAll)
module.exports = router;