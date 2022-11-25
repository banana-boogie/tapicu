//@ts-nocheck
import { useState } from 'react';

import { COOKIE_PRICE } from '../../constants';
import PaymentForm from '../PaymentForm';
import styles from './Cookie.module.css'

// TODO: move all stripe payment code to a component
// TODO: send an email receipt:  https://dashboard.stripe.com/settings/branding
export default function Cookie() {
    const [cookieCounter, setCookieCounter] = useState(1);
    const [showCheckout, setShowCheckout] = useState(false);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                COOKIES🍪!
            </h1>
            {showCheckout ?
                <div>
                    <h1>Cookie Order Confirmation</h1>
                    <span className="cookie-order">Cookies: {cookieCounter}  ${cookieCounter * COOKIE_PRICE}</span>
                    <PaymentForm />

                </div>
                :
                <div className="cookie-wrapper">
                    <button className="subtract-cookie" onClick={() => cookieCounter > 1 && setCookieCounter(cookieCounter - 1)}>-</button>
                    <span className="cookie-counter">{cookieCounter}</span>
                    <button className="add-cookie" onClick={() => setCookieCounter(cookieCounter + 1)}>+</button>
                    <div>
                        <button onClick={() => setShowCheckout(true)}> BUY ME!</button>
                    </div>
                </div>
            }

        </main >
    )
}
