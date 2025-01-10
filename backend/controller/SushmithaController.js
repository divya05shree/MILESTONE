const RSVP = require('../models/usermodel'); // Assuming RSVP is the Mongoose model

// Retrieve All RSVP Responses
exports.getAllRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find(); 
    res.status(200).json({ success: true, data: rsvps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving RSVPs', error });
  }
};

// Retrieve RSVP List Sorted by Preferences
exports.getSortedRSVPsByPreference = async (req, res) => {
  try {
    const preferenceOrder = ['vegetarian', 'non-vegetarian', 'vegan']; // Custom sort order

    const rsvps = await RSVP.find(); 

    // Sort RSVPs based on the preferenceOrder
    const sortedRSVPs = rsvps.sort((a, b) => {
      return preferenceOrder.indexOf(a.preference) - preferenceOrder.indexOf(b.preference);
    });

    res.status(200).json({ success: true, data: sortedRSVPs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sorting RSVPs by preferences', error });
  }
};

// Search RSVP Entries
exports.searchRSVPs = async (req, res) => {
  try {
    const { query } = req.query; 

    if (!query) {
      return res.status(400).json({ success: false, message: 'Query parameter is required' });
    }

    // Performs search across name, email, and preference fields
    const rsvps = await RSVP.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { preference: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, data: rsvps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error searching RSVPs', error });
  }
};
