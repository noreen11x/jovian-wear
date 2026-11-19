// Sample data for testing the API
// Run this script to populate sample products and collections

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './backend/src/models/Product.js';
import Collection from './backend/src/models/Collection.js';

dotenv.config();

const sampleProducts = [
  {
    title: 'Premium Knit Sweater',
    description: 'Luxurious knit sweater perfect for any occasion',
    vendor: 'Jovian Wear',
    handle: 'premium-knit-sweater',
    image: {
      url: 'https://via.placeholder.com/400',
      alt: 'Premium Knit Sweater'
    },
    images: [
      { url: 'https://via.placeholder.com/400', alt: 'Premium Knit Sweater - Front' },
      { url: 'https://via.placeholder.com/400', alt: 'Premium Knit Sweater - Back' }
    ],
    price: 89.99,
    compareAtPrice: 129.99,
    sku: 'KNIT-001',
    category: 'Sweaters',
    tags: ['knit', 'sweater', 'premium'],
    variants: [
      {
        id: 'var-001',
        title: 'S - Black',
        option1: 'S',
        price: 89.99,
        sku: 'KNIT-001-S-BLK',
        inventoryQuantity: 50
      },
      {
        id: 'var-002',
        title: 'M - Black',
        option1: 'M',
        price: 89.99,
        sku: 'KNIT-001-M-BLK',
        inventoryQuantity: 75
      },
      {
        id: 'var-003',
        title: 'L - Black',
        option1: 'L',
        price: 89.99,
        sku: 'KNIT-001-L-BLK',
        inventoryQuantity: 60
      }
    ],
    options: [
      {
        id: 'opt-001',
        name: 'Size',
        position: 1,
        values: ['S', 'M', 'L', 'XL']
      }
    ],
    published: true,
    rating: {
      average: 4.5,
      count: 12
    }
  },
  {
    title: 'Cozy Knit Pants',
    description: 'Comfortable and stylish knit pants',
    vendor: 'Jovian Wear',
    handle: 'cozy-knit-pants',
    image: {
      url: 'https://via.placeholder.com/400',
      alt: 'Cozy Knit Pants'
    },
    price: 79.99,
    compareAtPrice: 109.99,
    sku: 'KNIT-PANTS-001',
    category: 'Pants',
    tags: ['knit', 'pants', 'comfortable'],
    variants: [
      {
        id: 'var-p-001',
        title: 'S - Gray',
        option1: 'S',
        price: 79.99,
        sku: 'KNIT-PANTS-001-S-GRY',
        inventoryQuantity: 40
      },
      {
        id: 'var-p-002',
        title: 'M - Gray',
        option1: 'M',
        price: 79.99,
        sku: 'KNIT-PANTS-001-M-GRY',
        inventoryQuantity: 55
      }
    ],
    published: true,
    rating: {
      average: 4.2,
      count: 8
    }
  },
  {
    title: 'Lightweight Cardigan',
    description: 'Perfect layering piece for any season',
    vendor: 'Jovian Wear',
    handle: 'lightweight-cardigan',
    image: {
      url: 'https://via.placeholder.com/400',
      alt: 'Lightweight Cardigan'
    },
    price: 69.99,
    sku: 'CARD-001',
    category: 'Cardigans',
    tags: ['cardigan', 'lightweight', 'layering'],
    variants: [
      {
        id: 'var-c-001',
        title: 'S - Cream',
        option1: 'S',
        price: 69.99,
        sku: 'CARD-001-S-CRM',
        inventoryQuantity: 30
      }
    ],
    published: true,
    rating: {
      average: 4.7,
      count: 15
    }
  }
];

const sampleCollections = [
  {
    title: 'Knitwear Sets',
    handle: 'knitwear-sets',
    description: 'Complete knit outfits',
    published: true
  },
  {
    title: 'Knit Tops',
    handle: 'knit-tops',
    description: 'Stylish knit tops and sweaters',
    published: true
  },
  {
    title: 'Knit Pants',
    handle: 'knit-pants',
    description: 'Comfortable knit bottoms',
    published: true
  },
  {
    title: 'Best Seller',
    handle: 'best-seller',
    description: 'Our most popular items',
    published: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jovianwear');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Collection.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create collections first
    const createdCollections = await Collection.insertMany(sampleCollections);
    console.log(`✅ Created ${createdCollections.length} collections`);

    // Create products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Link products to collections
    const sweaterCollectionId = createdCollections.find(c => c.handle === 'knit-tops')._id;
    const pantsCollectionId = createdCollections.find(c => c.handle === 'knit-pants')._id;
    const bestSellerCollectionId = createdCollections.find(c => c.handle === 'best-seller')._id;

    // Update collections with products
    await Collection.updateOne(
      { _id: sweaterCollectionId },
      { products: [createdProducts[0]._id, createdProducts[2]._id] }
    );

    await Collection.updateOne(
      { _id: pantsCollectionId },
      { products: [createdProducts[1]._id] }
    );

    await Collection.updateOne(
      { _id: bestSellerCollectionId },
      { products: createdProducts.map(p => p._id) }
    );

    console.log('🔗 Linked products to collections');

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\nSample data loaded:');
    console.log('- 3 Products');
    console.log('- 4 Collections');
    console.log('\nYou can now test the API at http://localhost:5000/api');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
