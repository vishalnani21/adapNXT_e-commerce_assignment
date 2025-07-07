const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { userAuth } = require("../middleware/auth");

// Place Order
router.post("/order", userAuth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart || cart.items.length === 0) return res.status(400).send("Cart is empty");

  const order = await Order.create({
    userId: req.user._id,
    items: cart.items,
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

// Get User's Orders
router.get("/orders", userAuth, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).populate("items.productId");
  res.json(orders);
});

module.exports = router;
