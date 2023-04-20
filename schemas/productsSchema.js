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
  },
  stock: {
    type: Number,
    required: true,
  },
  status: String,
  option: [String],
  discount: {
    default: 0,
    type: Number,
  },
  discountedPrice: {
    type: Number,
    default: function () {
      return this.price * (1 - this.discount) || null;
    },
  },
  shipping: Number,
  quantity: { type: Number },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = productSchema;
