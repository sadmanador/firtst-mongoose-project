const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const productSchema = require("../schemas/productsSchema");
const Product = new mongoose.model("Product", productSchema);

//get all the products
//find({supports query like active: "active"})
//.limit(n) n= # selects n amount of data
router.get("/", async (req, res) => {
  try {
    //selects with Date field, select take 0=false, 1=true
    const result = await Product.find({}).select({
      Date: 0,
    });
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//returns all matches with query search
router.get("/search", async (req, res) => {
  try {
    const query = req.body.search;
    const regex = new RegExp(query, "i");
    const result = await Product.find({ name: regex });
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//get a single product
router.get("/:id", async (req, res) => {
  try {
    const result = await Product.find({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//post product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
  } catch (error) {
    console.log(error.message);
  }
});

//post multiple product
router.post("/all", async (req, res) => {
  try {
    const result = await Product.insertMany(req.body);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});

//put product
//updateOne works similar way with the third parameter
router.put("/:id", async (req, res) => {
  const updatedData = req.body;

  try {
    const result = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: updatedData,
      },
      {
        //third parameter
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});

//delete product
router.delete("/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});

//deleteMany by id
router.delete("/delete-many", async (req, res) => {
  try {
    const idsToDelete = req.body.search;
    const result = await Product.deleteMany({ _id: { $in: idsToDelete } });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
