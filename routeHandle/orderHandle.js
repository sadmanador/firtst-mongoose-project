const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const orderSchema = require("../schemas/orderSchema");
const Order = new mongoose.model("Order", orderSchema);

//get all the orders
router.get("/", async (req, res) => {
  try {
    const result = await Order.find({}).populate("productIds");
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//get a single order
router.get("/:id", async (req, res) => {
  try {
    const result = await Order.find({ _id: req.params.id }).populate(
      "productIds"
    );
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});


//all pending
router.get("/status_pending", async (req, res) => {
  try {
    const result = await Order.find({ delivery_status: "pending" }).populate(
      "productIds"
    );
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});


//all processing status
router.get("/status_pending", async (req, res) => {
  try {
    const result = await Order.find({ delivery_status: "processing" }).populate(
      "productIds"
    );
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});


//all ready to deliver status
router.get("/status_pending", async (req, res) => {
  try {
    const result = await Order.find({ delivery_status: "readyToDeliver" }).populate(
      "productIds"
    );
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//all delivered status
router.get("/status_pending", async (req, res) => {
  try {
    const result = await Order.find({ delivery_status: "delivered" }).populate(
      "productIds"
    );
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});


//all return status
router.get("/status_pending", async (req, res) => {
  try {
    const result = await Order.find({ delivery_status: "returned" }).populate(
      "productIds"
    );
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});


//making an order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    console.log(newProduct);
    res.send(newOrder);
  } catch (error) {
    console.log(error.message);
  }
});

//set delivery_status: "processing"
router.put('/:id', async (req, res)=> {
  const status = req.body;

  try {
    const result = await Order.findById(status);
    await result.save();
  } catch (error) {
    console.error(error.message)
  }
})


module.exports = router;
