import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Get cart
router.get('/:cartId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId).populate('items.product');
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to cart
router.post('/:cartId/items', async (req, res) => {
  try {
    const { product, variantId, quantity, price } = req.body;
    
    let cart = await Cart.findById(req.params.cartId);
    
    if (!cart) {
      cart = new Cart({ _id: req.params.cartId, items: [] });
    }
    
    // Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === product && item.variantId === variantId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, variantId, quantity, price });
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update cart item
router.put('/:cartId/items/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    
    const cart = await Cart.findById(req.params.cartId);
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const item = cart.items.id(req.params.itemId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
router.delete('/:cartId/items/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items.id(req.params.itemId).deleteOne();
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new cart
router.post('/', async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
