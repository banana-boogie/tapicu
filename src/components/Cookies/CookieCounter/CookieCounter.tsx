import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import UnstyledButton from '@components/UnstyledButton';

type Props = {
  cookieCount: number;
  cookieCountOnChange: (value: number) => void;
  variantType: string;
  disable: boolean;
  delegated?: any;
  hideButtons: boolean;
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
  hideButtons = false,
  variantType = 'large',
  ...delegated
}: Props) => {
  const variants: Variants = {
    large: {
      display: 'block',
      counterSize: 48,
      countSize: '124px',
      countWeight: 'var(--font-weight-regular)',
      countWidth: '144px',
      counterGap: 'var(--space-xs)',
      plusButtonSource: '/plus_blue.svg',
      minusButtonSource: '/minus_blue.svg',
    },
    small: {
      display: 'none',
      counterSize: 24,
      countSize: '24px',
      countWeight: 'var(--font-weight-medium)',
      countWidth: '16px',
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
        }}
        onClick={() =>
          cookieCount > 1 && cookieCountOnChange(Number(cookieCount) - 1)
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
      <CounterButton
        style={{
          display: variant.display,
        }}
        onClick={() =>
          cookieCount < 99 && cookieCountOnChange(Number(cookieCount) + 1)
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
