import { TAX_RATE } from '@/constants/constants';
const COOKIE_PRICE = Number(process.env.NEXT_PUBLIC_COOKIE_PRICE);

function getSubTotal(cookieCount: number): string {
  return roundToNearest(cookieCount * COOKIE_PRICE, 2);
}

function getTaxTotal(cookieCount: number): string {
  const subTotal = Number(getSubTotal(cookieCount));
  return roundToNearest(subTotal * TAX_RATE, 2);
}

export function getTotal(cookieCount: number): string {
  const subTotal = Number(getSubTotal(cookieCount));
  const taxTotal = Number(getTaxTotal(cookieCount));

  if (cookieCount == 1) {
    return roundToNearest(4 + taxTotal, 2);
  } else if (cookieCount === 2) {
    return roundToNearest(7 + taxTotal, 2);
  } else if (cookieCount === 3) {
    return roundToNearest(10 + taxTotal, 2);
  }

  return roundToNearest(subTotal + taxTotal, 2);
}

export function calculateOrderAmount(cookies: number) {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // reference: https://stripe.com/docs/currencies#zero-decimal
  const currencySmallestUnit = 100;

  return Math.round(
    Number(getTotal(cookies)) * (1 + TAX_RATE) * currencySmallestUnit
  );
}

export function roundToNearest(
  amount: number | string,
  nearest: number
): string {
  if (typeof amount === 'string') {
    amount = Number(amount);
  }
  const multiplier = Math.pow(10, nearest);
  return (Math.round(amount * multiplier) / multiplier).toFixed(nearest);
}
