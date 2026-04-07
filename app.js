import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import Menu from "./models/menuModel.js";
import { initialDishes } from "./src/data/dishes.js";
const app = express();

app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/FlavourFlyDB";
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected to", mongoURI))
  .catch(err => console.log("MongoDB connection error:", err));

/* -------- ROUTES -------- */

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

/* -------- MENU ROUTES -------- */

// GET menu
app.get("/api/menu", async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// SEED menu (run once)
app.get("/api/seed-menu", async (req, res) => {
  try {
    await Menu.deleteMany(); // clear old data

    await Menu.insertMany(initialDishes);

    res.send("Menu seeded successfully with rich frontend data");
  } catch (err) {
    res.status(500).send("Error seeding menu: " + err.message);
  }
});

/* -------- START SERVER -------- */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});