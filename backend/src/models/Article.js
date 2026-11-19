import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
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
    content: String,
    excerpt: String,
    author: String,
    image: {
      url: String,
      alt: String,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
    tags: [String],
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
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

export default mongoose.model('Article', articleSchema);
