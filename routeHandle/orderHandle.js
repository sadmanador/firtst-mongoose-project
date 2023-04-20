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

//processing: false
router.get("/yet-to-process", async (req, res) => {
  try {
    const result = await Order.find({ processing: false }).populate(
      "productIds"
    );
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//readyToDeliver: false
router.get("/yet-to-delivered", async (req, res) => {
  try {
    const result = await Order.find({
      processing: true,
      readyToDeliver: true,
    }).populate("productIds");
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//delivered: false
router.get("/delivered", async (req, res) => {
  try {
    const result = await Order.find({
      processing: true,
      readyToDeliver: true,
      delivered: true,
    }).populate("productIds");
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

//updating the processing
router.put("/:id", async (req, res) => {
  const updates = req.body;

  try {
    const result = await Order.updateOne(
      { _id: req.params.id },
      {
        $set: updates,
      }
    ).populate("productIds");
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});


module.exports = router;
