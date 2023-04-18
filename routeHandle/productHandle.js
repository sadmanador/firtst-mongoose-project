const express = require("express");
const router = express.Router();

//get all the products
router.get("/", async (req, res) => {});

//get a single product
router.get("/:id", async (req, res) => {});

//post product
router.post("/", async (req, res) => {});

//post multiple product
router.post("/all", async (req, res) => {});

//put product
router.get("/:id", async (req, res) => {});

//delete product
router.delete("/:id", async (req, res) => {});

module.exports = router;
