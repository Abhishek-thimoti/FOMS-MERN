import mongoose from "mongoose";
import "dotenv/config"; // This tells the file to read your .env file

// Grab the URI from your .env file instead of hardcoding the local one
const mongoURI = process.env.MONGO_URI; 

if (!mongoURI) {
  console.error("Error: MONGO_URI is missing from your .env file!");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas");
    try {
      await mongoose.connection.db.dropCollection('users');
      console.log("Successfully dropped the old 'users' collection to clear outdated indexes.");
    } catch (err) {
      if (err.code === 26) {
        console.log("Collection doesn't exist, all good.");
      } else {
        console.error("Error dropping collection:", err);
      }
    }
    process.exit(0);
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });