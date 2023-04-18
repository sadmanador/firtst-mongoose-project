const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const productSchema = require("../schemas/productsSchema");
const Product = new mongoose.model("Product", productSchema);

//get all the products
//find({supports query like active: "active"})
//select now blocks the Date, select take 0=false, 1=true
//.limit(n) n= # selects n amount of data
router.get("/", async (req, res) => {
  const result = await Product.find({}).select({
    Date: 0,
  });
  res.send(result);
});

//get a single product
router.get("/:id", async (req, res) => {
  const result = await Product.find({_id: req.params.id});
  res.send(result);
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
router.delete("/:id", async (req, res) => {
    const result = await Product.deleteOne({_id: req.params.id});
    console.log(result)
});

module.exports = router;
