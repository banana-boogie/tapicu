import assert from 'node:assert';
import type { NextApiRequest, NextApiResponse } from 'next';

import { calculateOrderAmount } from '@/utils';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

type Data = {
  message?: string;
  clientSecret?: string;
  paymentIntentId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cookies } = req.body;
  assert(typeof cookies === 'number', 'Invalid type for cookies');

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(cookies),
      currency: 'cad',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: 'Error in the create-payment-intent function' });
  }
}
