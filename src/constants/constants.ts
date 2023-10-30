export const COOKIE_PRICE = Number(process.env.NEXT_PUBLIC_COOKIE_PRICE);
export const TAX_RATE = Number(process.env.NEXT_PUBLIC_TAX_RATE);
export const MAX_COOKIES = 12;
export const MIN_COOKIES = 1;

interface CookieMap {
  [key: number]: number;
}

/**
 * Cookie Price Map — Lists the price for each set of cookies.
 * @param count number of cookies
 * @returns total price of the cookies
 */
export function getCookiePrice(count: number) {
  const cookiePriceMap: CookieMap = {
    1: 4,
    2: 7,
    3: 10,
    4: 13,
    5: 16,
    6: 19,
    7: 22,
    8: 25,
    9: 28,
    10: 31,
    11: 34,
    12: 37,
  };

  return cookiePriceMap[count] || COOKIE_PRICE;
}
