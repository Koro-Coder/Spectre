const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('c:/Users/Abhishek/Desktop/Spectre/models/user');

const uri = 'mongodb+srv://SupremeLeader:4DukR8CUJVyEsV8V@cluster-dev.a4dfbsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-dev';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('test');
    const collection = database.collection('users');

    const result = await collection.insertOne({ phone_number: "123-4567-890" });
    console.log('User inserted:', result);

  } catch (err) {
    console.error('Error inserting user:', err);
  } finally {
    await client.close();
  }
}

//run().catch(console.error);

async function fn(){
  await mongoose.connect(uri);
  console.log('Connected to mongoDB server');
  await User.create({ phone_number: "123-4567-890" });
  console.log('User saved');
}

fn();