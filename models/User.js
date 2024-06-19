const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for user profiles
const userSchema = new Schema({
  phone_number: { type: String, required: true },
  groups: [{ type: String }],
  leetcode: {
    username: String,
    problems_solved: {
      all: Number,
      hard: Number,
      medium: Number,
      easy: Number,
    },
    global_ranking: Number,
    top_percentage: Number,
    badge: String,
  },
  codeforces: {
    username: String,
    problems_solved: [{
      range: String,
      count: Number,
    }],
    rating: Number,
    rank: String,
  },
  total_problems_solved: { type: Number, default: 0 },
  last_checked: { type: Number, default: 0 },
  credits: { type: Number, default: 10 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
