import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

type Props = {
  cookies: number;
  children: React.ReactNode;
};

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripPublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(stripPublicKey);

export default function PaymentProvider({ cookies, children }: Props) {
  const [clientSecret, setClientSecret] = React.useState('');
  const [paymentIntentId, setPaymentIntentId] = React.useState('');

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (clientSecret) {
      fetch('/api/update-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cookies,
          paymentIntentId,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookies }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        });
    }
  }, [cookies]);

  const appearance: StripeElementsOptions['appearance'] = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {children}
        </Elements>
      )}
    </>
  );
}
