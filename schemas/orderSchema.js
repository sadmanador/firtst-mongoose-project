const { default: mongoose } = require("mongoose");

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
    enum: ["COD", "nagad", "bKash"],
  },
  processing: {
    enum: [true, false],
  },
  readyToDeliver: {
    enum: [true, false],
  },
  delivered: {
    enum: [true, false],
  },
  OTP: {
    type: String,
    default: function () {
      return Math.floor(100000 + Math.random() * 900000).toString();
    },
  },
});

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

module.exports = orderSchema;