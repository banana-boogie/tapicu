import React from 'react';
import styled from 'styled-components';

import Footer from '@components/Footer';
import { QUERIES } from '@/constants/css';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Wrapper>
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  @media (${QUERIES.tabletAndBigger}) {
    max-width: 700px;
    margin: 0 auto;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;
