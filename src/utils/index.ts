import { TAX_RATE } from '@/constants/constants';
const COOKIE_PRICE = Number(process.env.NEXT_PUBLIC_COOKIE_PRICE);

export function calculateOrderAmount(cookies: number) {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // reference: https://stripe.com/docs/currencies#zero-decimal
  const currencySmallestUnit = 100;

  // NOTE: Black Cultural Event Prices
  // 1 Cookie = 3.75
  // 2 Cookies = 7
  // 3 Cookies = 10
  // 4 Cookie = 15 (plus a card)
  if (cookies === 1) {
    return Math.round(3.75 * currencySmallestUnit);
  } else if (cookies === 2) {
    return Math.round(7 * currencySmallestUnit);
  } else if (cookies === 3) {
    return Math.round(10 * currencySmallestUnit);
  } else if (cookies === 4) {
    return Math.round(15 * currencySmallestUnit);
  }

  return Math.round(
    cookies * COOKIE_PRICE * (1 + TAX_RATE) * currencySmallestUnit
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
