const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.js');

const uri = 'mongodb+srv://SupremeLeader:4DukR8CUJVyEsV8V@cluster-dev.a4dfbsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-dev';

async function showUserDetails(phone_number){
  return await User.findOne({phone_number: phone_number});
}

/*async function addDetails(phone_number, data){
  const user = await User.findOne({phone_number: phone_number});
  if(user){
    Object.keys(data).forEach(key => {
      user[key] = data[key];
    });
    await user.save();
  }else{
    await User.create({ phone_number: phone_number, });
  }
}
*/

async function addUserDetails(phone_number, updates) {
  try {
    // Include the phoneNumber in the updates
    updates.phone_number = phone_number;

    // Find the user by phone number and update or insert if it doesn't exist
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