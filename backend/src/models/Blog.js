import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
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
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
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

export default mongoose.model('Blog', blogSchema);
