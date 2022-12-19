import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { COOKIE_PRICE } from '@constants/constants';

import CookieCounterComponent from '@/components/Cookies/CookieCounter';
import PaymentForm from '@components/PaymentForm';
import PaymentProvider from '@components/PaymentProvider';

type Props = {
  cookieCount: number;
  cookieCountOnChange: (value: number) => void;
  total: number;
};

const Checkout = ({ cookieCount, cookieCountOnChange, total }: Props) => {
  return (
    <PaymentProvider cookies={cookieCount}>
      <CheckoutWrapper>
        <CheckoutOrder>
          <CookiesImage
            src={"/abi's_cookies_cookie_jar.svg"}
            alt="Cookies"
            width={55}
            height={55}
          />
          <OrderDescriptionWrapper>
            <CookieName>Abi&apos;s Cookies</CookieName>
            <CookiePrice>${COOKIE_PRICE}</CookiePrice>
          </OrderDescriptionWrapper>
          <CookieCounter
            variantType={'small'}
            cookieCount={cookieCount}
            cookieCountOnChange={cookieCountOnChange}
          />
        </CheckoutOrder>
        <Divider />
        <TotalWrapper>
          <Total>Total </Total>
          <TotalNumber>${total}</TotalNumber>
        </TotalWrapper>
        <PaymentForm />
      </CheckoutWrapper>
    </PaymentProvider>
  );
};

const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-lg);
  margin-top: var(--space-md);
`;

const CheckoutOrder = styled.div`
  display: flex;
  border: 1px solid var(--color-gray-500);
  border-radius: var(--border-radius-xs);
  padding: var(--space-sm) var(--space-xs);
  margin-bottom: var(--space-sm);
`;

const CookieCounter = styled(CookieCounterComponent)`
  margin-right: var(--space-xxs);
`;

const CookiesImage = styled(Image)``;

const OrderDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding-left: var(--space-sm);
`;

const CookieName = styled.p`
  margin: 0;
  font-size: calc(var(--font-size-md) + 2px);
  font-weight: var(--font-weight-light);
`;

const CookiePrice = styled.p`
  margin: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid var(--color-gray-300);
`;

const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 var(--space-xxs);
`;

const Total = styled.h3`
  font-weight: var(--font-weight-regular);
`;
const TotalNumber = styled.h3`
  font-weight: var(--font-weight-medium);
`;

export default Checkout;
