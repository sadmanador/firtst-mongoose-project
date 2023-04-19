const mongoose = require("mongoose");

const selectedProductsSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const orderSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,

    maxLength: 50,
  },
  address: {
    type: String,
    required: true,
    maxLength: 200,
  },
  phone: {
    type: Number,
    required: true,

    max: 16,
  },
  productIds: selectedProductsSchema,
  paymentMode: {
    type: String,
  },
  processing: {
    type: Boolean,
    default: function (){
      return false},
  },
  readyToDeliver: {
    type: Boolean,
    default: function (){
      return false},
  },
  delivered: {
    type: Boolean,
    default: function (){
      return false},
  },
  OTP: {
    type: String,
    default: function () {
      return Math.floor(100000 + Math.random() * 900000).toString();
    },
  },
});

module.exports = orderSchema;
