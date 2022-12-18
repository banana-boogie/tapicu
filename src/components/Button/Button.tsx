import React from 'react';
import styled from 'styled-components';

import Icon from '@components/Icon';
import UnstyledButton from '@components/UnstyledButton';

type Props = {
  onClickHandler: () => void;
  hideArrow?: boolean;
  children: React.ReactNode;
};

function Button({ hideArrow, onClickHandler, children, ...delegated }: Props) {
  return (
    <Wrapper onClick={onClickHandler} {...delegated}>
      {children}
      {!hideArrow && (
        <RightArrowIcon
          id="arrow-right"
          strokeWidth={2}
          size={24}
          color={'var(--color-white)'}
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
  background: var(--color-primary);
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
