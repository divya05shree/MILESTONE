const express = require('express');
const router = express.Router();
const rsvpController = require('../controller/userController');

//create rsvp
router.post('/rsvp', rsvpController.createRsvp);

//get throug id
router.get('/rsvps/:id', rsvpController.getRsvpById);

//login
router.post('/login', rsvpController.login);

module.exports = router;