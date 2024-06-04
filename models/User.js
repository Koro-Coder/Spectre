const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for user profiles
const userSchema = new Schema({
  phone_number: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
