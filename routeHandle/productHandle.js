const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const productSchema = require("../schemas/productsSchema");
const Product = new mongoose.model("Product", productSchema);

//get all the products
router.get("/", async (req, res) => {
    const result = await Product.find({})
    res.send(result)
});

//get a single product
router.get("/:id", async (req, res) => {
    
});

//post product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
});

//post multiple product
router.post("/all", async (req, res) => {
  const result = await Product.insertMany(req.body);
  console.log(result);
});

//put product
//updateOne works similar way with the third parameter
router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  console.log(updatedData);
  const result = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: updatedData,
    },
    //third parameter
    {
      new: true,
      useFindAndModify: false,
    }
  );
  console.log(result);
});

//delete product
router.delete("/:id", async (req, res) => {});

module.exports = router;
