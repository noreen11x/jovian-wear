import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

// Create payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'USD', metadata = {} } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata,
    });
    
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Confirm payment
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    res.json({
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
