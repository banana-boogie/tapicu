//@ts-nocheck
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import Icon from "@components/Icon";
import PaymentForm from "@components/PaymentForm";
import PaymentProvider from "@components/PaymentProvider";
import ProgressBarComponent from "@components/ProgressBar";
import UnstyledButton from "@components/UnstyledButton";

import { COOKIE_PRICE } from "@constants/constants";
import useInput from "@hooks/useInput.hook";

export default function Cookie() {
  const {
    value: cookieCount,
    setValue: setCookieCount,
    onChange: cookieCountOnChange,
  } = useInput(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const TOTAL_STEPS = 3;

  function getTotal() {
    return (cookieCount * COOKIE_PRICE).toFixed(2);
  }

  // Make it so that you can't have less than 1 cookie
  useEffect(() => {
    if (cookieCount < 1) {
      setCookieCount(1);
    }
  }, [cookieCount]);

  const Checkout = () => {
    return (
      <CheckoutWrapper>
        <CloseCheckoutButton onClick={() => setShowCheckout(false)}>
          <CloseIcon id="close" strokeWidth={3} size={24} />
        </CloseCheckoutButton>
        <CheckoutHeader>Cookie Order Confirmation</CheckoutHeader>
        <CheckoutOrder>
          Cookies: {cookieCount} ${cookieCount * COOKIE_PRICE}
        </CheckoutOrder>
        <PaymentForm />
      </CheckoutWrapper>
    );
  };

  const PageHeader = () => {
    return (
      <PageHeaderWrapper>
        {currentStep > 1 ? (
          <BackButtonWrapper>
            <BackButton onClick={() => setCurrentStep(currentStep - 1)}>
              <BackIcon id="back" strokeWidth={3} size={24} />
            </BackButton>
          </BackButtonWrapper>
        ) : (
          <Spacer />
        )}
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <Spacer />
      </PageHeaderWrapper>
    );
  };

  return (
    <PaymentProvider>
      <Wrapper>
        <PageHeader />
        {showCheckout ? (
          <Checkout />
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
              <CookieNumber
                value={cookieCount}
                onChange={cookieCountOnChange}
                inputMode="numeric"
                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              />
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
            <Total>Total: ${getTotal()}</Total>
            <BuyButton onClick={() => setShowCheckout(true)}>
              Give Me Cookies!
            </BuyButton>
          </>
        )}
      </Wrapper>
    </PaymentProvider>
  );
}

const Wrapper = styled.main`
  flex: 1;
  display: grid;
  grid-template-rows: 50px 2fr 1fr 100px;
`;

const Spacer = styled.div`
  flex: 1;
`;

const PageHeaderWrapper = styled.div`
  display: flex;
`;

const ProgressBar = styled(ProgressBarComponent)`
  flex: 1;
`;

const BackButtonWrapper = styled.div`
  flex: 1;
  align-self: center;
  padding-left: var(--space-sm);
`;
const BackButton = styled(UnstyledButton)``;
const BackIcon = styled(Icon)``;

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

const CheckoutWrapper = styled.div``;

const CheckoutHeader = styled.h1``;

const CloseCheckoutButton = styled(UnstyledButton)``;
const CloseIcon = styled(Icon)``;

const CheckoutOrder = styled.p``;
