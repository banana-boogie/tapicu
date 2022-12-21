import assert from 'node:assert';
import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { calculateOrderAmount } from '@/utils';

type Data = {
  message?: string;
  paymentIntentId?: string;
  amount?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cookies, paymentIntentId } = req.body;
  assert(typeof cookies === 'number', 'Invalid type for cookies');
  assert(
    typeof paymentIntentId === 'string',
    'Invalid type for paymentIntentId'
  );

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount: calculateOrderAmount(cookies),
    });
    res.send({
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: 'Error in the update-payment-intent function' });
  }
}
