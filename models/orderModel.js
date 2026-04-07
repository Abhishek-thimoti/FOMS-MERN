import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Preparing', 'Delivered', 'Cancelled'] }
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
