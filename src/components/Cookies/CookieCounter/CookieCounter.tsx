import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import UnstyledButton from '@components/UnstyledButton';
import { MIN_COOKIES, MAX_COOKIES } from '@/constants/constants';

type Props = {
  cookieCount: number;
  cookieCountOnChange: (value: number) => void;
  variantType: string;
  disable?: boolean;
  delegated?: any;
};

type Variants = {
  [key: string]: {
    counterSize: number;
    countSize: string;
    countWeight: string;
    countWidth: string;
    counterGap: string;
    plusButtonSource: string;
    minusButtonSource: string;
    display: string;
  };
};

const CookieCounter = ({
  cookieCount,
  cookieCountOnChange,
  disable = false,
  variantType = 'large',
  ...delegated
}: Props) => {
  const isCookiesMin = cookieCount === MIN_COOKIES;
  const isCookiesMaxed = cookieCount === MAX_COOKIES;

  const variants: Variants = {
    large: {
      display: 'block',
      counterSize: 48,
      countSize: '124px',
      countWeight: 'var(--font-weight-regular)',
      countWidth: '144px',
      counterGap: 'var(--space-xs)',
      plusButtonSource: '/plus_button.svg',
      minusButtonSource: '/minus_button.svg',
    },
    small: {
      display: 'none',
      counterSize: 24,
      countSize: '24px',
      countWeight: 'var(--font-weight-medium)',
      countWidth: '48px',
      counterGap: '0px',
      plusButtonSource: '/plus_outline.svg',
      minusButtonSource: '/minus_outline.svg',
    },
  };
  const variant = variants[variantType];
  if (!variant) {
    throw new Error('Invalid variant: not found');
  }

  function inputHandler(e: { target: { value: string } }) {
    cookieCountOnChange(Number(e.target.value));
  }
  return (
    <Wrapper
      style={{
        // @ts-ignore
        '--gap': variant.counterGap,
      }}
      {...delegated}
    >
      <CounterButton
        style={{
          display: variant.display,
          opacity: isCookiesMin ? 0.1 : 1,
        }}
        onClick={() =>
          cookieCount > MIN_COOKIES &&
          cookieCountOnChange(Number(cookieCount) - 1)
        }
      >
        <Image
          src={variant.minusButtonSource}
          alt="minus button"
          width={variant.counterSize}
          height={variant.counterSize}
        />
      </CounterButton>
      <CookieNumber
        disabled={true}
        style={{
          // @ts-ignore
          '--font-size': variant.countSize,
          '--font-weight': variant.countWeight,
          '--width': variant.countWidth,
        }}
        value={cookieCount}
        onChange={inputHandler}
        inputMode="numeric"
        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
      />
      {/* ONLY DISPLAY + COUNTER for cookie count less than max */}
      <CounterButton
        style={{
          display: variant.display,
          opacity: isCookiesMaxed ? 0.1 : 1,
        }}
        onClick={() =>
          !isCookiesMaxed && cookieCountOnChange(Number(cookieCount) + 1)
        }
      >
        <Image
          src={variant.plusButtonSource}
          alt="plus button"
          width={variant.counterSize}
          height={variant.counterSize}
        />
      </CounterButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
`;

const CounterButton = styled(UnstyledButton)``;

const CookieNumber = styled.input`
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-align: center;
  border: none;
  width: var(--width);
  padding: 0;
  text-align: center;
`;

export default CookieCounter;
