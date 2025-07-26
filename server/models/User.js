const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  savedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }]
});
module.exports = mongoose.model('User', userSchema);