import React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Button from '@components/Button';
import CookiePageHeader from '@/components/Cookies/CookiePageHeader';
import CookieCounter from '@/components/Cookies/CookieCounter';
import Checkout from '@components/Checkout';

import AlertMessage from '@/components/AlertMessage';
import { getTotal } from '@/utils';
import { MAX_COOKIES, MIN_COOKIES } from '@/constants/constants';

export default function Cookie() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cookieCount, setCookieCount] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [disableBuyButton, setDisableBuyButton] = useState(false);
  const [showBulkOrderMessage, setShowBulkOrderMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleCookieCountChange(value: number) {
    setCookieCount(value);
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
    if (cookieCount < MIN_COOKIES) {
      setDisableBuyButton(true);
      setShowError(true);
      setErrorMessage('really??? you want 0 cookies?');

      // More than 12 cookies,
    } else if (cookieCount === MAX_COOKIES) {
      setShowBulkOrderMessage(true);

      // More than MAX cookies
    } else if (cookieCount > MAX_COOKIES) {
      setDisableBuyButton(true);
      setShowError(true);
      setErrorMessage('email abi@tapicu.ca');

      // Reset message displays
    } else {
      setDisableBuyButton(false);
      setShowError(false);
      setShowBulkOrderMessage(false);
      setErrorMessage('');
    }
  }, [cookieCount]);

  return (
    <Wrapper>
      <CookiePageHeader
        currentStep={currentStep}
        totalSteps={3}
        handleBack={handleBack}
      />
      {showCheckout ? (
        <Checkout
          cookieCount={cookieCount}
          cookieCountOnChange={handleCookieCountChange}
        />
      ) : (
        <>
          <HeroImage
            src={'/tapicu_logo.svg'}
            alt="Cookies"
            width={169}
            height={169}
          />
          <CookieCounterWrapper>
            <Question>
              How many cookies <br /> would you like?
            </Question>

            <CookieCounter
              variantType="large"
              cookieCount={cookieCount}
              cookieCountOnChange={handleCookieCountChange}
            />
            {showError && (
              <ErrorMessage type="error">{errorMessage}</ErrorMessage>
            )}
            {showBulkOrderMessage && (
              <BulkOrderMessage type="info">
                <span>
                  If you&apos;d like to order more than 12 cookies, please visit
                  the &nbsp;
                  <Link
                    href="http://www.tapicu.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tapicu
                  </Link>
                  &nbsp; website.
                </span>
              </BulkOrderMessage>
            )}
            <Divider />
            <TotalWrapper>
              <Total>Total </Total>
              <TotalNumber>${getTotal(cookieCount)}</TotalNumber>
            </TotalWrapper>
          </CookieCounterWrapper>
          <BuyButton
            disabled={disableBuyButton}
            onClickHandler={handleBuyCookes}
          >
            Buy Cookies
          </BuyButton>
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

const HeroImage = styled(Image)`
  align-self: center;
`;

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

const ErrorMessage = styled(AlertMessage)`
  margin: var(--space-lg);
`;

const BulkOrderMessage = styled(AlertMessage)`
  margin: var(--space-lg);
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

const Link = styled.a`
  text-decoration: none;
  align-self: center;
  font-size: calc(var(--font-size-sm) + 1px);
`;
