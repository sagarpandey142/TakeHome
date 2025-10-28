const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  price: String,
  stock_status: String,
  stock_quantity: { type: Number, default: null },
  category: { type: String, default: null },
  tags: { type: [String], default: [] },
  on_sale: { type: Boolean, default: false },
  created_at: String
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
