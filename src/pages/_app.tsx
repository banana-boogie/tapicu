import Head from "next/head";
import type { AppProps } from "next/app";

import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";

import GlobalStyles from "@components/GlobalStyles";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Abi&apos;s Cookies</title>
        <meta name="description" content="mmmmm cookies yummy in my tummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
