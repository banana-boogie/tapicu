import assert from 'node:assert';
import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const COOKIE_PRICE = Number(process.env.NEXT_PUBLIC_COOKIE_PRICE);

type Data = {
  message?: string;
  clientSecret?: string;
};

const calculateOrderAmount = (cookies: number) => {
  assert(typeof cookies === 'number', 'Invalid type for cookies');
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // reference: https://stripe.com/docs/currencies#zero-decimal
  const currencySmallestUnit = 100;
  return cookies * COOKIE_PRICE * currencySmallestUnit;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cookies } = req.body;

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
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: 'Error in the create-payment-intent function' });
  }
}
