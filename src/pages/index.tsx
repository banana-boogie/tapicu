import Head from "next/head";
import styled from "styled-components";

import Cookie from "@components/Cookie";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>Abi&apos;s Cookies</title>
        <meta name="description" content="mmmmm cookies yummy in my tummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Cookie />
      </Main>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  /* height: calc(var(--vh, 1vh) * 100); */
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
