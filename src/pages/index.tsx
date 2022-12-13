import Head from "next/head";
import styled from "styled-components";

import Cookie from "@components/Cookie";
import Header from "@components/Header";
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
        <Header />
        <Cookie />
      </Main>
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
  min-height: 100%;
`;
