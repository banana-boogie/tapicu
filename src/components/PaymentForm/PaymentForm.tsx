import React from 'react';
import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import Button from '@components/Button';

const STRIPE_RETURN_URL = process.env.NEXT_PUBLIC_STRIPE_RETURN_URL;

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const returnUrl =
      STRIPE_RETURN_URL || `https://${window.location.host}/cookies/receipt`;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: returnUrl,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      const errorMessage = error.message || 'An unexpected error occurred.';
      setMessage(errorMessage);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      const status = paymentIntent?.status || {};
      switch (status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const paymentElementOptions = {
    layout: 'accordion',
    paymentMethodOrder: ['apple_pay', 'applePay', 'googlePay', 'google_pay'],
  };

  return (
    <Wrapper>
      {
        /* Show any error or success messages */
        message && <Message>{message}</Message>
      }
      <Form onSubmit={handleSubmit}>
        {/* @ts-ignore */}
        <PaymentElement options={{ layout: 'accordion' }} />
        <PayButton type="submit" disabled={isLoading || !stripe || !elements}>
          <PayButtonText>
            {isLoading ? (
              <Spinner className="spinner" id="spinner"></Spinner>
            ) : (
              'Submit Order'
            )}
          </PayButtonText>
        </PayButton>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: var(--space-xl);
`;

const Form = styled.form``;

const Message = styled.p``;

const PayButton = styled(Button)`
  width: 100%;
  margin-top: var(--space-lg);
`;

const PayButtonText = styled.span``;

const Spinner = styled.div``;
