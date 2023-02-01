import React from 'react';
import styled from 'styled-components';
import Icon from '@components/Icon';

type Props = {
  type: 'success' | 'error' | 'info' | 'warning';
  children: React.ReactNode;
};

function AlertMessage({ type, children, ...delegated }: Props) {
  const variants = {
    success: {
      id: 'check-circle',
      backgroundColor: 'var(--color-background-success)',
      fill: 'none',
      strokeWidth: 0,
    },
    error: {
      id: 'alert-circle',
      backgroundColor: 'var(--color-background-error)',
      fill: '#EF4D61',
      strokeWidth: 2,
    },
    info: {
      id: 'alert-circle',
      backgroundColor: 'var(--color-background-info)',
      fill: 'hsl(187deg 100% 46%)',
      strokeWidth: 2,
    },
    warning: {
      id: 'alert-circle',
      backgroundColor: 'var(--color-background-warning)',
      fill: '#FFC12E',
      strokeWidth: 2,
    },
  };

  const variant = variants[type];
  if (!variant) {
    throw new Error('Invalid variant: not found');
  }

  return (
    <Wrapper
      // @ts-ignore
      style={{ '--background-color': variant.backgroundColor }}
      {...delegated}
    >
      <AlertIcon
        id={variant.id}
        fill={variant.fill}
        strokeWidth={variant.strokeWidth}
      />
      <Message> {children} </Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: var(--space-md);
  display: flex;
  align-items: center;
  background: var(--background-color);
  border-radius: var(--border-radius-xs);
`;

const Message = styled.p`
  text-align: start;
  color: var(--color-gray-600);
  padding: 0 var(--space-md);
  margin: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  width: 100%;
`;

const AlertIcon = styled(Icon)``;

export default AlertMessage;
