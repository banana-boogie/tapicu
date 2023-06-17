import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Wrapper>
      <Title>Tapicú 🍪!</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: var(--space-xs);
`;
const Title = styled.h1`
  font-size: var(--font-size-xl);
`;

export default Header;
