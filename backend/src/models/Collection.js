import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: String,
    image: {
      url: String,
      alt: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
    publishedAt: Date,
    seoTitle: String,
    seoDescription: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Collection', collectionSchema);
