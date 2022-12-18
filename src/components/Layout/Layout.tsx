import React from "react";
import styled from "styled-components";

import Footer from "@components/Footer";

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
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
