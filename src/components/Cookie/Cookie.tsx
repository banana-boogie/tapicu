//@ts-nocheck
import { useState } from 'react';
import styled from 'styled-components';

import { COOKIE_PRICE } from '@constants/constants';
import PaymentForm from '@components/PaymentForm';
import PaymentProvider from '@components/PaymentProvider';

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
          <div className="cookie-wrapper">
            <button
              className="subtract-cookie"
              onClick={() =>
                cookieCounter > 1 && setCookieCounter(cookieCounter - 1)
              }
            >
              -
            </button>
            <span className="cookie-counter">{cookieCounter}</span>
            <button
              className="add-cookie"
              onClick={() => setCookieCounter(cookieCounter + 1)}
            >
              +
            </button>
            <div>
              <button onClick={() => setShowCheckout(true)}> BUY ME!</button>
            </div>
          </div>
        )}
      </Wrapper>
    </PaymentProvider>
  );
}

const Wrapper = styled.main`
  flex: 1;
`;
