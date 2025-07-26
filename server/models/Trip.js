const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  itinerary: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Trip', tripSchema);
