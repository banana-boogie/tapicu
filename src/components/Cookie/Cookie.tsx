//@ts-nocheck
import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import UnstyledButton from '@components/UnstyledButton';
import PaymentForm from '@components/PaymentForm';
import PaymentProvider from '@components/PaymentProvider';

import { COOKIE_PRICE } from '@constants/constants';
export default function Cookie() {
  const [cookieCounter, setCookieCounter] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <PaymentProvider>
      <Wrapper>
        {showCheckout ? (
          <div>
            <h1>Cookie Order Confirmation</h1>
            <span className="cookie-order">
              Cookies: {cookieCounter} ${cookieCounter * COOKIE_PRICE}
            </span>
            <PaymentForm />
          </div>
        ) : (
          <>
            <CookieCounter>
              <CounterButton
                onClick={() =>
                  cookieCounter > 1 && setCookieCounter(cookieCounter - 1)
                }
              >
                <Image
                  src="/minus-sign.svg"
                  alt="minus-sign"
                  width={72}
                  height={72}
                />
              </CounterButton>
              <CookieNumber>{cookieCounter}</CookieNumber>
              <CounterButton
                className="add-cookie"
                onClick={() => setCookieCounter(cookieCounter + 1)}
              >
                <Image
                  src="/plus-sign.svg"
                  alt="plus-sign"
                  width={72}
                  height={72}
                />
              </CounterButton>
            </CookieCounter>
            <button onClick={() => setShowCheckout(true)}> BUY ME!</button>
          </>
        )}
      </Wrapper>
    </PaymentProvider>
  );
}

const Wrapper = styled.main`
  flex: 1;
  display: grid;
  grid-template-rows: 2fr 100px;
`;

const CookieCounter = styled.div`
  display: grid;
  place-content: center;
  grid-template-columns: minmax(50px, 1fr) 3fr minmax(50px, 1fr);
  justify-items: center;
`;

const CounterButton = styled(UnstyledButton)`
  display: grid;
  place-content: center;
  height: 100%;
  width: 100%;
`;

const CookieNumber = styled.h1`
  font-size: 222px;
  text-align: center;
`;
