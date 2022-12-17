import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { COOKIE_PRICE } from '@constants/constants';

import CookieCounter from '@components/CookieCounter';
import PaymentForm from '@components/PaymentForm';
import PaymentProvider from '@components/PaymentProvider';

type Props = {
  cookieCount: number;
  cookieCountOnChange: (value: number) => void;
};

const Checkout = ({ cookieCount, cookieCountOnChange }: Props) => {
  return (
    <PaymentProvider>
      <CheckoutWrapper>
        <CheckoutOrder>
          <CookiesImage
            src={'/cookies.png'}
            alt="Cookies"
            width={100}
            height={100}
          />
          <OrderDescriptionWrapper>
            <CookieName>Abi&apos;s Cookies</CookieName>
            <CookiePrice>${COOKIE_PRICE}</CookiePrice>
          </OrderDescriptionWrapper>
          <CookieCounter
            cookieCount={cookieCount}
            cookieCountOnChange={cookieCountOnChange}
          />
        </CheckoutOrder>
        <PaymentForm />
      </CheckoutWrapper>
    </PaymentProvider>
  );
};

const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckoutOrder = styled.div`
  display: flex;
`;

const CookiesImage = styled(Image)`
  border-radius: var(--border-radius-md);
`;

const OrderDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CookieName = styled.p`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
`;

const CookiePrice = styled.p`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
`;

export default Checkout;
