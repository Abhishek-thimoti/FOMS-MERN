import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  nutrition: {
    calories: { type: Number },
    protein: { type: String },
    carbs: { type: String }
  }
}, {
  timestamps: true
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
