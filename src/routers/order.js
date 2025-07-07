const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { userAuth } = require("../middleware/auth");


router.post("/order", userAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      totalAmount: cart.subTotal
    });

    
    cart.items = [];
    cart.subTotal = 0;
    await cart.save();

    const savedOrder = await order.save();

    res.status(201).json({ message: "Order placed successfully", data: savedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});


router.get("/orders", userAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
