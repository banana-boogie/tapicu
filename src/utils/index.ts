import { TAX_RATE } from '@/constants/constants';
const COOKIE_PRICE = Number(process.env.NEXT_PUBLIC_COOKIE_PRICE);

export function calculateOrderAmount(cookies: number) {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // reference: https://stripe.com/docs/currencies#zero-decimal
  const currencySmallestUnit = 100;
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
