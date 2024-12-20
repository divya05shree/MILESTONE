const RSVP = require('../models/usermodel');
const jwt = require('jsonwebtoken');  // Import JWT

// Create a new RSVP
exports.createRsvp = async (req, res) => {
  try {
    const newRsvp = await RSVP.create(req.body);
    res.status(201).json({ success: true, data: newRsvp });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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

// Login (or create a new RSVP)
exports.login = async (req, res) => {
  const { email, password, name, preferences } = req.body;

  // Check if the user has provided email and password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password to log in.',
    });
  }

  try {
    // Find user by email (organizer)
    let user = await RSVP.findOne({ email });

    // If the user is not found, ask them to provide RSVP details
    if (!user) {
      // If no user exists, register the user with provided details
      if (!name || !preferences) {
        return res.status(400).json({
          success: false,
          message: 'User not found. Please provide your RSVP details (name, preferences).',
        });
      }

      // Create a new user (RSVP) and save details
      user = new RSVP({
        email,
        name,
        preferences,
        password,  // Store password as plaintext (not recommended for production)
      });

      await user.save();

      return res.status(201).json({
        success: true,
        message: 'RSVP created successfully. You can now log in.',
      });
    }

    // If the user exists, check if the password is correct
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // If login is successful, generate a JWT token and return user details
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        email: user.email,
        name: user.name,
        preferences: user.preferences, // Return user preferences
      },
      token: token, // Send token to the user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
    });
  }
};
