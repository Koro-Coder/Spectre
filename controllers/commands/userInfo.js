const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../models/User.js');
const Group = require('../../models/Group.js');

async function showUserDetails(phone_number){
  return await User.findOne({phone_number: phone_number});
}

async function addUserDetails(phone_number, updates) {
  try {
    updates.phone_number = phone_number;

    const user = await User.findOneAndUpdate(
      { phone_number },
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function updateGroupDetails(groupid, participants){
  for(const participant of participants)
  {
    await User.findOneAndUpdate(
      { phone_number: participant.id.user },
      { $addToSet: { groups: groupid } }, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
  const phone_numbers = participants.map(participant => participant.id.user);
  await Group.findOneAndUpdate(
    { group_id: groupid }, 
    { $addToSet: { members: { $each: phone_numbers } } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
}

module.exports = {showUserDetails, addUserDetails, updateGroupDetails};