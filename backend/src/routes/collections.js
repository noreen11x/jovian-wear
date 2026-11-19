import express from 'express';
import Collection from '../models/Collection.js';

const router = express.Router();

// Get all collections
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find({ published: true })
      .populate('products');
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get collection by handle
router.get('/:handle', async (req, res) => {
  try {
    const collection = await Collection.findOne({ handle: req.params.handle })
      .populate('products');
    
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create collection (admin)
router.post('/', async (req, res) => {
  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json(collection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update collection (admin)
router.put('/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    
    res.json(collection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
