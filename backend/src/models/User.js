import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: String,
    lastName: String,
    phone: String,
    password: {
      type: String,
      required: true,
    },
    addresses: [
      {
        id: String,
        type: { type: String, enum: ['billing', 'shipping', 'default'] },
        firstName: String,
        lastName: String,
        company: String,
        address1: String,
        address2: String,
        city: String,
        province: String,
        country: String,
        zip: String,
        phone: String,
        default: Boolean,
      },
    ],
    defaultAddress: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    acceptsMarketing: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
