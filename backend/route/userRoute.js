const express = require('express');
const router = express.Router();
const rsvpController = require('../controller/userController');


router.post('/rsvp', rsvpController.createRsvp);

//used fro egt all rsvps
router.get('/rsvps', rsvpController.getAllRsvps);

// used for get rsvp with particular id
router.get('/rsvps/:id', rsvpController.getRsvpById);

//used for update rsvp detal through id
router.put('/rsvps/:id', rsvpController.updateRsvp);

// usde to delete rsvp
router.delete('/rsvps/:id', rsvpController.deleteRsvp);

module.exports = router;
