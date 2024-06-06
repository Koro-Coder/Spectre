const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for user profiles
const userSchema = new Schema({
  phone_number: { type: String, required: true },
  groups: [{type: String}],
  leetcode_profile: {type: String},
  codeforces_profile: {type: String},
  credits: {type: Number, default: 10},
  last_timestamp: {type: Date},
  lc_problems_solved: {type: Number},
  cf_problems_solved: {type: Number},
  last_updated: {type: Number, default: Date.now}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
