const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password:{
      type:String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    preference: {
      type: String,
      enum: ['vegetarian', 'non-vegetarian'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['VIP', 'speaker', 'attendee', 'organizers'],
      default: 'attendee',
    },
  },
  { timestamps: true }
);

const RSVP = mongoose.model('RSVP', RsvpSchema);

module.exports = RSVP;