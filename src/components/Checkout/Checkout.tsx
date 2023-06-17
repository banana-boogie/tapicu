import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { COOKIE_PRICE, TAX_RATE } from '@constants/constants';
import { roundToNearest } from '@/utils';

import CookieCounterComponent from '@/components/Cookies/CookieCounter';
import PaymentForm from '@components/PaymentForm';
import PaymentProvider from '@components/PaymentProvider';

type Props = {
  cookieCount: number;
  cookieCountOnChange: (value: number) => void;
};

const Checkout = ({ cookieCount, cookieCountOnChange }: Props) => {
  function getSubTotal(): string {
    return roundToNearest(cookieCount * COOKIE_PRICE, 2);
  }

  function getTaxTotal(): string {
    // const subTotal = Number(getSubTotal());
    // return roundToNearest(subTotal * TAX_RATE, 2);
    return '0';
  }

  function getTotal(): string {
    const subTotal = Number(getSubTotal());
    const taxTotal = Number(getTaxTotal());
    if (cookieCount == 1) {
      return roundToNearest(3.75 + taxTotal, 2);
    } else if (cookieCount == 2) {
      return roundToNearest(7 + taxTotal, 2);
    } else if (cookieCount == 3) {
      return roundToNearest(10 + taxTotal, 2);
    }
    return roundToNearest(subTotal + taxTotal, 2);
  }

  return (
    <PaymentProvider cookies={cookieCount}>
      <CheckoutWrapper>
        <CheckoutOrder>
          {/* <CookiesImage
            src={"/abi's_cookies_cookie_jar.svg"}
            alt="Cookies"
            width={55}
            height={55}
          /> */}
          <CookiesImage
            src={'/tapicu_logo.svg'}
            alt="Cookies"
            width={55}
            height={55}
          />
          <OrderDescriptionWrapper>
            <CookieName>Tapicú</CookieName>
            {/* <CookiePrice>Cookies</CookiePrice> */}
          </OrderDescriptionWrapper>
          <CookieCounter
            disable={true}
            variantType={'small'}
            cookieCount={cookieCount}
            cookieCountOnChange={cookieCountOnChange}
          />
        </CheckoutOrder>
        {/* <SubTotalWrapper>
          <SubTotal>Subtotal</SubTotal>
          <SubTotalNumber>${getSubTotal()}</SubTotalNumber>
        </SubTotalWrapper>
        <TaxWrapper>
          <Tax>Tax</Tax>
          <TaxTotal>${getTaxTotal()}</TaxTotal>
        </TaxWrapper> */}
        <Divider />
        <TotalWrapper>
          <Total>Total </Total>
          <TotalNumber>${getTotal()}</TotalNumber>
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

const TaxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 var(--space-xxs);
`;
const Tax = styled.h3`
  font-weight: var(--font-weight-lightest);
  font-size: var(--font-size-sm);
`;
const TaxTotal = styled.h3`
  font-weight: var(--font-weight-lightest);
  font-size: var(--font-size-sm);
`;

const SubTotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 var(--space-xxs);
`;
const SubTotal = styled.h4`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-light);
`;
const SubTotalNumber = styled.h4`
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-sm);
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
