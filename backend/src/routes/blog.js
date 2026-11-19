import express from 'express';
import Article from '../models/Article.js';
import Blog from '../models/Blog.js';

const router = express.Router();

// Get all articles
router.get('/articles', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-publishedAt' } = req.query;
    
    const skip = (page - 1) * limit;
    
    const articles = await Article.find({ published: true })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Article.countDocuments({ published: true });
    
    res.json({
      articles,
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

// Get article by handle
router.get('/articles/:handle', async (req, res) => {
  try {
    const article = await Article.findOne({ handle: req.params.handle })
      .populate('blog');
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('articles');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get blog by handle
router.get('/:handle', async (req, res) => {
  try {
    const blog = await Blog.findOne({ handle: req.params.handle })
      .populate('articles');
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
