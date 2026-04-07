const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const Payment = require('../models/Payment');

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId, userId } = req.body;

    // Create the PaymentIntent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: 'usd',
      metadata: { orderId: orderId || '', userId: userId || '' }
    });

    // Store intention in Database
    await Payment.create({
      paymentId: paymentIntent.id,
      user: userId || undefined,
      order: orderId || undefined,
      amount,
      currency: 'usd',
      status: 'pending'
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPaymentIntent };
