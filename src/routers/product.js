const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { userAuth } = require("../middleware/auth");
const checkRole = require("../middleware/checkRole.js");


router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/products", userAuth, checkRole("admin"), async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const product = await Product.create({ name, price, category, stock });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put("/products/:id", userAuth, checkRole("admin"), async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete("/products/:id", userAuth, checkRole("admin"), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
