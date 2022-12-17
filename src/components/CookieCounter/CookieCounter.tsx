import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import UnstyledButton from '@components/UnstyledButton';

type Props = {
  cookieCount: number;
  cookieCountOnChange: (value: number) => void;
};

const CookieCounter = ({ cookieCount, cookieCountOnChange }: Props) => {
  function inputHandler(e: { target: { value: string } }) {
    cookieCountOnChange(Number(e.target.value));
  }
  return (
    <Wrapper>
      <CounterButton
        onClick={() =>
          cookieCount > 1 && cookieCountOnChange(Number(cookieCount) - 1)
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
        value={cookieCount}
        onChange={inputHandler}
        inputMode="numeric"
        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
      />
      <CounterButton
        onClick={() =>
          cookieCount < 99 && cookieCountOnChange(Number(cookieCount) + 1)
        }
      >
        <Image
          src="/plus_button.svg"
          alt="plus button"
          width={48}
          height={48}
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
  margin-top: calc(-1 * var(--space-lg));
  margin-bottom: calc(-1 * var(--space-md));
`;

const CounterButton = styled(UnstyledButton)``;

const CookieNumber = styled.input`
  font-size: 128px;
  text-align: center;
  border: none;
  width: 144px;
  padding: 0;
  text-align: center;
`;

export default CookieCounter;
