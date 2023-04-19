const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const orderSchema = require("../schemas/orderSchema");
const Order = new mongoose.model("Order", orderSchema);

//get all the orders
router.get("/", async (req, res) => {
  try {
    const result = await Order.find({})
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//get a single order
router.get("/:id", async (req, res) => {
  try {
    const result = await Order.find({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//updating the processing
router.put("/:id", async (req, res) => {
  const processing = req.body.processing;

  try {
    const result = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { processing: processing },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});

//updating readyToDeliver
router.put("/:id", async (req, res) => {
  const readyToDeliver = req.body.readyToDeliver;

  try {
    const result = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { readyToDeliver: readyToDeliver },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});

//updating the delivered
router.put("/:id", async (req, res) => {
    const delivered = req.body.delivered;
  
    try {
      const result = await Order.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: { delivered: delivered },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  });


  module.exports = router;