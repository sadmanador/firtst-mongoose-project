const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const productSchema = require("../schemas/productsSchema");
const Product = new mongoose.model("Product", productSchema);

//get all the products
router.get("/", async (req, res) => {});

//get a single product
router.get("/:id", async (req, res) => {});

//post product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
});

//post multiple product
router.post("/all", async (req, res) => {});

//put product
router.get("/:id", async (req, res) => {});

//delete product
router.delete("/:id", async (req, res) => {});

module.exports = router;
