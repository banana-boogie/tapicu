import React from 'react';
import styled from 'styled-components';

import Icon from '@components/Icon';
import UnstyledButton from '@components/UnstyledButton';

type Props = {
  onClickHandler?: () => void;
  hideArrow?: boolean;
  style?: any;
  disabled?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

function Button({
  hideArrow,
  disabled,
  onClickHandler,
  children,
  type = 'button',
  ...delegated
}: Props) {
  return (
    <Wrapper
      type={type}
      onClick={onClickHandler}
      disabled={disabled}
      {...delegated}
    >
      {children}
      {!hideArrow && (
        <RightArrowIcon
          id="arrow-right"
          strokeWidth={2}
          size={24}
          color={'var(--color-white)'}
          fill="none"
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  background: ${({ disabled }) =>
    disabled ? 'var(--color-gray-300)' : 'var(--color-button-primary)'};
  margin-top: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--border-radius-xs);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
`;

const RightArrowIcon = styled(Icon)`
  margin-left: var(--space-sm);
  transform: translateY(1px);
`;

export default Button;
