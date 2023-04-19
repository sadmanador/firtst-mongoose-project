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
  brand_logo: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: String,
  option: [String],
  discount: {
    type: Number,
    default: function () {
      return 0;
    }
  },
  shipping: Number,
  quantity: { type: Number },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = productSchema;