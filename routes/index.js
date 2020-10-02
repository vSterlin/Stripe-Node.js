const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/pay", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_1HXeBIF9Qh9qfP2fxFOcrzex',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
})
module.exports = router;
