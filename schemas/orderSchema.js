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
  modification_dates: { type: [Date], default: [] },
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
  delivery_status: { type: String, default: "ordered" },
  total_price: { type: Number, required: true },
  tax: { type: Number, required: true },
  shipping_fees: { type: Number, required: true },
  subtotal: {
    type: Number,
    required: true,
    default: function () {
      return this.total_price + this.tax + this.shipping_fees;
    },
  },
  OTP: {
    type: String,
    default: function () {
      return Math.floor(100000 + Math.random() * 900000).toString();
    },
  },
  eta: {
    type: Date,
    default: function () {
      const etaDate = new Date();
      etaDate.setDate(this.date.getDate() + 5);
      return etaDate;
    },
  },
});

//schema middleware
//middleware that push new dates after saving the order by any modification
orderSchema.post("updateOne", function (next) {
  this.modification_dates.push(new Date());
  next();
});

module.exports = orderSchema;
