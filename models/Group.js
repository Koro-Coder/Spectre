const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for group
const groupSchema = new Schema({
  group_id: {type: String, required: true},
  members: [{type: String, ref: 'User'}]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
