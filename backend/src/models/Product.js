import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: String,
    vendor: String,
    handle: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      url: String,
      alt: String,
    },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    compareAtPrice: Number,
    costPerItem: Number,
    sku: String,
    barcode: String,
    weight: Number,
    weightUnit: { type: String, default: 'kg' },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
      },
    ],
    tags: [String],
    category: String,
    variants: [
      {
        id: String,
        title: String,
        option1: String,
        option2: String,
        option3: String,
        sku: String,
        barcode: String,
        price: Number,
        compareAtPrice: Number,
        weight: Number,
        image: {
          url: String,
          alt: String,
        },
        position: Number,
        inventoryQuantity: {
          type: Number,
          default: 0,
        },
        inventoryManagement: {
          type: String,
          enum: ['shopify', 'external', 'fulfillment_service'],
          default: 'shopify',
        },
      },
    ],
    options: [
      {
        id: String,
        name: String,
        position: Number,
        values: [String],
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
    publishedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
