//@ts-nocheck
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import Button from "@components/Button";
import CookieCounter from "@components/CookieCounter";
import Checkout from "@components/Checkout";
import Icon from "@components/Icon";
import ProgressBarComponent from "@components/ProgressBar";
import UnstyledButton from "@components/UnstyledButton";

import { COOKIE_PRICE } from "@constants/constants";

export default function Cookie() {
  const TOTAL_PROGRES_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const [cookieCount, setCookieCount] = useState(1);

  function handleCookieCountChange(value: number) {
    setCookieCount(value);
  }

  function getTotal() {
    return (cookieCount * COOKIE_PRICE).toFixed(2);
  }

  function handleBuyCookes() {
    setShowCheckout(true);
    setCurrentStep(1);
  }

  function handleBack() {
    showCheckout ? setShowCheckout(false) : setShowCheckout(true);
    setCurrentStep(currentStep - 1);
  }

  // Make it so that you can't have less than 1 cookie
  useEffect(() => {
    if (cookieCount < 1) {
      setCookieCount(1);
    } else if (cookieCount >= 100) {
      setCookieCount(99);
    }
  }, [cookieCount, setCookieCount]);

  const PageHeader = () => {
    return (
      <PageHeaderWrapper>
        {currentStep > 0 ? (
          <BackButtonWrapper>
            <BackButton onClick={handleBack}>
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
        <ProgressBar
          currentStep={currentStep}
          totalSteps={TOTAL_PROGRES_STEPS}
        />
        <Spacer />
      </PageHeaderWrapper>
    );
  };

  return (
    <Wrapper>
      <PageHeader />
      {showCheckout ? (
        <Checkout
          cookieCount={cookieCount}
          cookieCountOnChange={handleCookieCountChange}
          total={getTotal()}
        />
      ) : (
        <>
          <AbisCookieJarImage
            src={"/abi's_cookies_cookie_jar.svg"}
            alt=""
            height={169}
            width={169}
          />
          <CookieCounterWrapper>
            <Question>
              How many cookies <br /> would you like?
            </Question>

            <CookieCounter
              cookieCount={cookieCount}
              cookieCountOnChange={handleCookieCountChange}
            />
            <CookiePrice>(${COOKIE_PRICE} per cookie)</CookiePrice>
            <Divider />
            <TotalWrapper>
              <Total>Total </Total>
              <TotalNumber>${getTotal()}</TotalNumber>
            </TotalWrapper>
          </CookieCounterWrapper>
          <BuyButton onClick={handleBuyCookes}>Buy Cookies</BuyButton>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-md);
`;

const PageHeaderWrapper = styled.div`
  display: flex;
  padding: var(--space-md) 0;
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
  padding: var(--space-md) 0;
  isolation: isolate;
`;

const Question = styled.h2`
  font-size: calc(var(--font-size-lg) + 4px);
  font-weight: var(--font-weight-semibold);
  text-align: center;
  z-index: 1;
  margin-bottom: calc(-1 * var(--space-md));
`;

const CookiePrice = styled.p`
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-light);
  margin: 0;
  transform: translateY(calc(-1 * var(--space-sm)));
  margin-top: calc(-1 * var(--space-lg));
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
  font-weight: var(--font-weight-medium);
`;
const TotalNumber = styled.h3`
  font-weight: var(--font-weight-semibold);
`;

const BuyButton = styled(Button)``;
