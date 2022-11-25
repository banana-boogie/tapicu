import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import Cookie from '../components/Cookie'
import PaymentWrapper from '../components/PaymentWrapper';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tapic&uacute;</title>
        <meta name="description" content="mmmmm cookies yummy in my tummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <PaymentWrapper>
        <Cookie />
      </PaymentWrapper>

      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Tapic&uacute;{' '}
          <span className={styles.logo}>
            <Image src="/" alt="Tapicu Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
