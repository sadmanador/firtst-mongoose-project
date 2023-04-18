const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: Number,
  ratings: Number,
  ratingsCount: Number,
  img: {
    type: String,
    required: true,
  },
  shipping: Number,
  quantity: { type: Number },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = productSchema;