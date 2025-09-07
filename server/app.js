import express from "express";
import dotenv from "dotenv";

import authRoute from './routes/auth.route.js'

// import { database } from "./config/database.js";
import { database } from "./database/config.js";


// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", async (req, res) => {
  const db = await database();

  // console.log(db);
  
  
  res.json({message : "Email send successfully"})
});

app.use('/api/auth', authRoute)
// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at PORT: ${PORT}`);
});





//AAM7ZZTvJ08VTROF

// mongodb+srv://sayeedanwar593_db_user:AAM7ZZTvJ08VTROF@cluster7.l53pije.mongodb.net/?retryWrites=true&w=majority&appName=Cluster7
