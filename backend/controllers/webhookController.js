const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const Payment = require('../models/Payment');
const Order = require('../models/Order');

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // If webhook secret isn't provided (like in early dev), bypass verification OR use public default
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && webhookSecret !== 'whsec_placeholder') {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // Direct parsing for test payloads if secret not strictly enforced
      const payloadString = req.body.toString('utf8');
      event = JSON.parse(payloadString);
    }
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        
        // Update Payment Record
        const payment = await Payment.findOneAndUpdate(
          { paymentId: paymentIntent.id },
          { status: 'succeeded' },
          { new: true }
        );

        if (payment && payment.order) {
           await Order.findByIdAndUpdate(payment.order, { 
             isPaid: true, 
             paidAt: Date.now(),
             status: 'Paid',
             paymentResult: {
               id: paymentIntent.id,
               status: 'succeeded',
               update_time: new Date().toISOString()
             }
           });
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentFailed = event.data.object;
        console.log(`PaymentIntent failed: ${paymentFailed.last_payment_error?.message}`);
        
        await Payment.findOneAndUpdate(
          { paymentId: paymentFailed.id },
          { status: 'failed' }
        );
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (dbError) {
    console.error('Database Error Processing Webhook', dbError);
    res.status(500).json({ message: 'Internal server error processing webhook' });
  }
};

module.exports = { handleStripeWebhook };
