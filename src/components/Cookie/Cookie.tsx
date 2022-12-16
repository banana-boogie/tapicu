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

  function handleBuyCookes() {
    setShowCheckout(true);
    setCurrentStep(1);
  }

  // Make it so that you can't have less than 1 cookie
  useEffect(() => {
    if (cookieCount < 1) {
      setCookieCount(1);
    }
  }, [cookieCount, setCookieCount]);

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
        {currentStep > 0 ? (
          <BackButtonWrapper>
            <BackButton onClick={() => setCurrentStep(currentStep - 1)}>
              <BackIcon
                id="back"
                strokeWidth={2}
                size={24}
                color={"var(--color-accent)"}
              />
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
        <AbisCookieJarImage
          src={"/Abi's_Cookies_Cookie_Jar.svg"}
          alt=""
          height={144}
          width={144}
        />
        {showCheckout ? (
          <Checkout />
        ) : (
          <>
            <CookieCounterWrapper>
              <Question>
                How many cookies <br /> would you like?
              </Question>

              <CookieCounter>
                <CounterButton
                  onClick={() =>
                    cookieCount > 1 && setCookieCount(Number(cookieCount) - 1)
                  }
                >
                  <Image
                    src="/minus_button.svg"
                    alt="minus button"
                    width={48}
                    height={48}
                  />
                </CounterButton>
                <CookieNumber
                  // TODO: limit numbers going past 100.. and below 0
                  value={cookieCount}
                  onChange={cookieCountOnChange}
                  inputMode="numeric"
                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                />
                <CounterButton
                  onClick={() =>
                    cookieCount < 99 && setCookieCount(Number(cookieCount) + 1)
                  }
                >
                  <Image
                    src="/plus_button.svg"
                    alt="plus button"
                    width={48}
                    height={48}
                  />
                </CounterButton>
              </CookieCounter>
              <CookiePrice>(${COOKIE_PRICE} per cookie)</CookiePrice>
              <Divider />
              <TotalWrapper>
                <Total>Total </Total>
                <TotalNumber>${getTotal()}</TotalNumber>
              </TotalWrapper>
            </CookieCounterWrapper>
            <BuyButton onClick={handleBuyCookes}>
              Buy Cookies
              <RightArrowIcon
                id="arrow-right"
                strokeWidth={2}
                size={18}
                color={"var(--color-white)"}
              />
            </BuyButton>
          </>
        )}
      </Wrapper>
    </PaymentProvider>
  );
}

const Wrapper = styled.main`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-lg);
`;

const PageHeaderWrapper = styled.div`
  display: flex;
  padding-top: var(--space-lg);
  padding-bottom: calc(var(--space-lg));
`;

const Spacer = styled.div`
  flex: 1;
`;

const ProgressBar = styled(ProgressBarComponent)`
  max-height: 100px;
`;

const AbisCookieJarImage = styled(Image)`
  align-self: center;
`;

const BackButtonWrapper = styled.div`
  flex: 1;
  align-self: center;
`;
const BackButton = styled(UnstyledButton)``;
const BackIcon = styled(Icon)``;

const CookieCounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-black);
  border-radius: 16px;
  margin-top: var(--space-md);
  padding: var(--space-lg) 0;
`;

const Question = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  text-align: center;
`;

const CookieCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CounterButton = styled(UnstyledButton)``;

const CookieNumber = styled.input`
  font-size: 92px;
  text-align: center;
  border: none;
  width: 144px;
  padding: 0;
  text-align: center;
`;

const CookiePrice = styled.p`
  text-align: center;
  font-size: var(--font-size-xs);
  margin: 0;
  transform: translateY(calc(-1 * var(--space-xl)));
`;

const Divider = styled.hr`
  width: calc(100% - var(--space-lg) * 2);
  margin: 0 var(--space-lg);
  border: none;
  border-top: 2px solid var(--color-gray-300);
`;
const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 var(--space-lg);
  margin-top: var(--space-sm);
`;
const Total = styled.h3`
  font-weight: var(--font-weight-normal);
`;
const TotalNumber = styled.h3`
  font-weight: var(--font-weight-medium);
`;

const BuyButton = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  background: var(--color-primary);
  margin-top: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--border-radius-xs);
  font-size: var(--font-size-lg);
`;

const RightArrowIcon = styled(Icon)`
  margin-left: var(--space-sm);
`;

const CheckoutWrapper = styled.div``;

const CheckoutHeader = styled.h1``;

const CloseCheckoutButton = styled(UnstyledButton)``;
const CloseIcon = styled(Icon)``;

const CheckoutOrder = styled.p``;
