const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../models/User.js');

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

    //console.log('User upserted:', user);
    return user;
  } catch (error) {
    console.log(error);
  }
}


module.exports = {showUserDetails, addUserDetails};

//0135 9485