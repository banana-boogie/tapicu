//@ts-nocheck
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import UnstyledButton from '@components/UnstyledButton';
import PaymentForm from '@components/PaymentForm';
import PaymentProvider from '@components/PaymentProvider';

import { COOKIE_PRICE } from '@constants/constants';
import useInput from '@hooks/useInput.hook';

export default function Cookie() {
  const { value: cookieCount,  setValue: setCookieCount, onChange: cookieCountOnChange} = useInput(1);
  const [showCheckout, setShowCheckout] = useState(false);

  function getTotal() {
    return (cookieCount * COOKIE_PRICE).toFixed(2);
  }

  // Make it so that you can't have less than 1 cookie
  useEffect(() => {
    if (cookieCount < 1) {
      setCookieCount(1);
    }
  }, [cookieCount]);

  return (
    // TODO: Dynamic button for payment - check stripe docs to see if you can tell what button will render
    <PaymentProvider>
      <Wrapper>
        {showCheckout ? (
          <div>
            <h1>Cookie Order Confirmation</h1>
            <span className="cookie-order">
              Cookies: {cookieCount} ${cookieCount * COOKIE_PRICE}
            </span>
            <PaymentForm />
          </div>
        ) : (
          <>
            <CookieCounter>
              <CounterButton
                onClick={() =>
                  cookieCount > 1 && setCookieCount(Number(cookieCount) - 1)
                }
              >
                <Image
                  src="/minus-sign.svg"
                  alt="minus-sign"
                  width={72}
                  height={72}
                />
              </CounterButton>
              <CookieNumber value={cookieCount} onChange={cookieCountOnChange} inputMode="numeric" onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}/>
              <CounterButton
                className="add-cookie"
                onClick={() => setCookieCount(Number(cookieCount) + 1)}
              >
                <Image
                  src="/plus-sign.svg"
                  alt="plus-sign"
                  width={72}
                  height={72}
                />
              </CounterButton>
            </CookieCounter>
            <Total>
              Total: ${getTotal()}
            </Total>
            <BuyButton onClick={() => setShowCheckout(true)}>
              Give Me Cookies!
            </BuyButton>
          </>
        )}
      </Wrapper>
    </PaymentProvider>
  )
}

const Wrapper = styled.main`
  flex: 1;
  display: grid;
  grid-template-rows: 2fr 1fr 100px;
`;

const CookieCounter = styled.div`
  display: grid;
  place-content: center;
  grid-template-columns: minmax(50px, 1fr) 1fr minmax(50px, 1fr);
  justify-items: center;
`;

const CounterButton = styled(UnstyledButton)`
  display: grid;
  place-content: center;
  height: 100%;
  width: 100%;
`;

const CookieNumber = styled.input`
  font-size: 4rem;
  text-align: center;
  border: none;
  max-width: 120px;
`;

const Total = styled.h2`
text-align: center;
`;

const BuyButton = styled(UnstyledButton)`
  text-align: center;
  color: var(--color-white);
  background: var(--color-primary);
  border: 1px solid var(--color-primary);
`;
