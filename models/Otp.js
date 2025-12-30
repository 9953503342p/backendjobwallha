const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: 300, default: Date.now }, // OTP expires in 5 minutes
});

module.exports = mongoose.model('Otp', OtpSchema);
