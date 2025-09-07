// db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URI;

// const uri =  "mongodb://localhost:27017";
const client = new MongoClient(url);

let db;

export const database = async () => {
  if (db) return db; // reuse if already connected

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    
    db = client.db("auth"); // pick your db name
    return db;
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    throw err;
  }
};
