const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { userAuth } = require("../middleware/auth");
const Product = require("../models/Product"); 

function calculateSubtotal(items) {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}




router.get("/cart", userAuth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
  res.json(cart || { items: [] });
});

router.post("/cart", userAuth, async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const price = product.price; 

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [{ productId, quantity, price }] });
  } else {
    const existingItem = cart.items.find(item => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }
  }
  cart.subTotal = calculateSubtotal(cart.items);
   await cart.save();

  await cart.save();
  res.status(200).json(cart);
});



router.patch("/cart/:productId", userAuth, async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });
  const item = cart.items.find(i => i.productId.equals(req.params.productId));
  if (item) item.quantity = quantity;
  await cart.save();
  res.json(cart);
});


router.delete("/cart/:productId", userAuth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  cart.items = cart.items.filter(item => !item.productId.equals(req.params.productId));
  await cart.save();
  res.json(cart);
});

module.exports = router;
