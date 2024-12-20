const RSVP = require('../models/usermodel');

// Create a new RSVP
exports.createRsvp = async (req, res) => {
  try {
    const newRsvp = await RSVP.create(req.body);
    res.status(201).json({ success: true, data: newRsvp });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all RSVPs
exports.getAllRsvps = async (req, res) => {
  try {
    const rsvps = await RSVP.find();
    res.status(200).json({ success: true, data: rsvps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get an RSVP by ID
exports.getRsvpById = async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id);
    if (!rsvp) {
      return res.status(404).json({ success: false, message: 'RSVP not found' });
    }
    res.status(200).json({ success: true, data: rsvp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update RSVP by ID
exports.updateRsvp = async (req, res) => {
  try {
    const rsvp = await RSVP.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!rsvp) {
      return res.status(404).json({ success: false, message: 'RSVP not found' });
    }
    res.status(200).json({ success: true, data: rsvp });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete RSVP by ID
exports.deleteRsvp = async (req, res) => {
  try {
    const rsvp = await RSVP.findByIdAndDelete(req.params.id);
    if (!rsvp) {
      return res.status(404).json({ success: false, message: 'RSVP not found' });
    }
    res.status(200).json({ success: true, message: 'RSVP deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
