import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionId: String,
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        variantId: String,
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    coupon: {
      code: String,
      discount: Number,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000),
    },
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

export default mongoose.model('Cart', cartSchema);
