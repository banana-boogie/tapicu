import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import CookiePageHeader from '@/components/Cookies/CookiePageHeader';
import VisuallyHidden from '@/components/VisuallyHidden';
import Icon from '@/components/Icon';
import Button from '@/components/Button';

type Props = {
  orderNumber: string;
};
type MessageType = {
  status: 'success' | 'error';
  text: string;
};

function Receipt({ orderNumber = '000012' }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState({ status: '', text: '' });
  const [isSendReciptButtonDisabled, setIsSendReciptButtonDisabled] =
    useState(true);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  // TODO: make message prettier: make alert component
  // TODO: figure out how to get total, amount of cookies, and order number
  // TODO: include tax in stripe payment
  const total = (15.0).toFixed(2);
  const amount = 3;

  useEffect(() => {
    setIsSendReciptButtonDisabled(!isValid);
  }, [isValid]);

  function handleBack() {
    router.push('/cookies');
  }

  function handleSendReceipt({ email = '' }) {
    setIsSendReciptButtonDisabled(true);
    const paymentIntentId = new URLSearchParams(window.location.search).get(
      'payment_intent'
    );

    if (!paymentIntentId) {
      setIsSendReciptButtonDisabled(false);
      return setMessage({
        status: 'error',
        text: 'no payment intent id found.',
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

  const MessageWrapper = ({ children }: { children: ReactNode }) => {
    const variants = {
      success: {
        color: 'var(--color-success)',
      },
      error: {
        color: 'var(--color-error)',
      },
    };
    // @ts-ignore
    const variant = variants[message.status];
    if (!variant) {
      throw new Error('Invalid variant: not found');
    }

    // @ts-ignore
    return <Message style={{ '--color': variant.color }}>{children}</Message>;
  };

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
            <span>x {amount}</span>
            <span>Items ordered</span>
          </div>
          <div>
            <span>{orderNumber}</span>
            <span>Order number</span>
          </div>
        </OrderLine>
      </ConfirmationBackground>

      {message.status && <MessageWrapper>{message.text}</MessageWrapper>}
      <EmailWrapper onSubmit={handleSubmit(handleSendReceipt)}>
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
      </EmailWrapper>
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

// TODO: make alert message component: follow desing in the mockup on figma
const Message = styled.p`
  text-align: center;
  background: var(--color-success);
  color: var(--color-gray-600);
  border-radius: var(--border-radius-xs);
  padding: var(--space-xxs) 0;
  margin: 0;
  font-size: var(--font-size-sm);
  width: 100%;
`;

const EmailWrapper = styled.form`
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
