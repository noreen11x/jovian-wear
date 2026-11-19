import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products with filtering
router.get('/', async (req, res) => {
  try {
    const { collection, search, page = 1, limit = 12, sort = '-createdAt' } = req.query;
    
    let query = { published: true };
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (collection) {
      query.collections = collection;
    }
    
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .populate('collections')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by handle
router.get('/:handle', async (req, res) => {
  try {
    const product = await Product.findOne({ handle: req.params.handle })
      .populate('collections');
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product (admin)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update product (admin)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product (admin)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
