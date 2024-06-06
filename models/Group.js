const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for group
const groupSchema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  members: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Group = mongoose.model('Group', userSchema);

module.exports = Group;
