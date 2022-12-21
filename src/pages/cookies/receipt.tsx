import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import AlertMessage from '@/components/AlertMessage';
import CookiePageHeader from '@/components/Cookies/CookiePageHeader';
import VisuallyHidden from '@/components/VisuallyHidden';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import { COOKIE_PRICE } from '@/constants/constants';
import { roundToNearest } from '@/utils';

type MessageType = {
  status: 'success' | 'error' | '';
  text: string;
};

type Props = {
  paymentIntentId?: string;
  orderNumber?: string;
  total?: number | string;
  numberOfItems?: number | string;
};

export async function getServerSideProps(context: any) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const { query } = context;
  const { payment_intent: paymentIntentId } = query;
  const data: Props = {};
  if (paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      const { id, amount, created } = paymentIntent;
      data.paymentIntentId = id;
      data.orderNumber = created;
      // reference: https://stripe.com/docs/currencies#zero-decimal
      const currencySmallestUnit = 100;
      data.total = roundToNearest(amount / currencySmallestUnit, 2);
      data.numberOfItems = (Number(data.total) / COOKIE_PRICE).toFixed(0);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: data,
  };
}

function Receipt(data: Props) {
  const router = useRouter();
  const [message, setMessage] = useState<MessageType>({ status: '', text: '' });
  const [isSendReciptButtonDisabled, setIsSendReciptButtonDisabled] =
    useState(true);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const {
    paymentIntentId,
    orderNumber = 'x',
    total = 0,
    numberOfItems = 0,
  } = data || {};

  useEffect(() => {
    setIsSendReciptButtonDisabled(!isValid);
  }, [isValid]);

  function handleBack() {
    router.push('/cookies');
  }

  function handleSendReceipt({ email = '' }) {
    setIsSendReciptButtonDisabled(true);

    if (!paymentIntentId) {
      setIsSendReciptButtonDisabled(false);
      return setMessage({
        status: 'error',
        text: 'Could not send receipt.',
      });
    }

    fetch('/api/send-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId, email }),
    })
      .then((res) => {
        if (res.status === 200) {
          setMessage({ status: 'success', text: 'Receipt sent!' });
        } else {
          setMessage({
            status: 'success',
            text: 'Error: could not send receipt.',
          });
        }
      })
      .catch(() => {
        setMessage({
          status: 'success',
          text: 'Error: could not send receipt.',
        });
      });
  }

  return (
    <Wrapper>
      <CookiePageHeader
        hideArrow={true}
        currentStep={2}
        totalSteps={3}
        handleBack={handleBack}
      />
      <ConfirmationBackground>
        <ThankYouText>Thank you for your order!</ThankYouText>
        <TakeCookiesText>Please take your cookies and enjoy.</TakeCookiesText>
        <OrderLine>
          <div>
            <span>${total}</span>
            <span>Total amount</span>
          </div>
          <div>
            <span>x {numberOfItems}</span>
            <span>Items ordered</span>
          </div>
          <div>
            <span>{orderNumber}</span>
            <span>Order number</span>
          </div>
        </OrderLine>
      </ConfirmationBackground>

      {message.status && (
        <AlertMessage type={message.status}>{message.text}</AlertMessage>
      )}

      <Form onSubmit={handleSubmit(handleSendReceipt)}>
        <EmailLabel htmlFor="email">
          <VisuallyHidden>Email my recipt</VisuallyHidden>
          Email my receipt
        </EmailLabel>
        <EmailInputWrapper>
          <EmailIcon id="email" strokeWidth={1} size={24} color="black" />
          <EmailInput
            type="email"
            placeholder="abi@tapicu.com"
            {...register('email', { required: true })}
          />
        </EmailInputWrapper>
        <SendReceiptButton
          type="submit"
          hideArrow={true}
          style={{
            '--background-color': isSendReciptButtonDisabled
              ? 'var(--color-gray-300)'
              : 'var(--color-primary)',
          }}
          disabled={isSendReciptButtonDisabled}
        >
          Send Receipt
        </SendReceiptButton>
      </Form>
      <BackHomeButton hideArrow={true} onClickHandler={handleBack}>
        Back to Home
      </BackHomeButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-sm);
  flex: 1;
`;

const ConfirmationBackground = styled.div`
  background: url('/confirmation_background.svg') no-repeat;
  height: 100%;
  width: 100%;
  max-height: 255px;
  margin: var(--space-md) 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
`;

const ThankYouText = styled.h1`
  text-align: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--space-xxl);
`;
const TakeCookiesText = styled.h2`
  text-align: center;
  font-size: calc(var(--font-size-md) + 2px);
  font-weight: var(--font-weight-regular);
  margin-top: calc(-1 * var(--space-md));
  color: var(--color-gray-100);
`;

const OrderLine = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: var(--space-md);
  & > * {
    display: flex;
    flex-direction: column;
    & > *:first-child {
      font-weight: var(--font-weight-medium);
      text-align: center;
    }
    & > *:nth-child(2) {
      font-weight: var(--font-weight-regular);
      font-size: var(--font-size-xs);
      color: var(--color-gray-800);
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-lg);
  margin-top: var(--space-sm);
  gap: var(--space-xs);
`;

const EmailInputWrapper = styled.div`
  border: 1px solid var(--color-black);
  border-radius: var(--border-radius-xs);
  display: flex;
  position: relative;
`;

const EmailInput = styled.input`
  background: transparent;
  width: 100%;
  border: none;
  text-align: center;
  padding: var(--space-sm) 0;
`;

const EmailIcon = styled(Icon)`
  position: absolute;
  top: 0;
  bottom: 0;
  height: ${({ size }) => size}px;
  margin: auto;
  left: var(--space-xs);
`;

const EmailLabel = styled.label`
  text-align: center;
  font-size: var(--font-size-xs);
`;

const SendReceiptButton = styled(Button)`
  font-size: var(--font-size-md);
  background-color: var(--background-color);
  color: var(--color-white);
  margin-top: var(--space-xxs);
  padding: var(--space-xs) 0;
  border-radius: var(--border-radius-xs);
`;

const BackHomeButton = styled(Button)`
  margin-top: auto;
  margin-bottom: var(--space-md);
  padding: var(--space-sm) 0;
`;

export default Receipt;
