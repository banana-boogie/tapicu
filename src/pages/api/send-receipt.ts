import joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

type Data = {
  message?: string;
};

const schema = joi.object({
  paymentIntentId: joi.string().required(),
  email: joi.string().email().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { paymentIntentId, email } = req.body;

  try {
    await schema.validateAsync({ paymentIntentId, email });
    await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: email,
    });

    console.log(`Success: Receipt sent to ${email}`);
    res.send({ message: `Receipt sent to ${email}` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error sending Receipt' });
  }
}
