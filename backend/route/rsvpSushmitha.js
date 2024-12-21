const express = require('express');
const router = express.Router();
const RSVPController = require('../controllers/SushmithaController');

// Route to get all RSVPs
router.get('/api/rsvps', RSVPController.getAllRSVPs);

// Route to get sorted RSVPs by preferences
router.get('/api/rsvps/sorted', RSVPController.getSortedRSVPsByPreference);

// Route to search RSVP entries
router.get('/api/search', RSVPController.searchRSVPs);

module.exports = router;
