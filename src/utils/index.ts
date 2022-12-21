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
