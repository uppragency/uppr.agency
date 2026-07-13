export function computeProfit(revenue: number, costThemarketer: number, costInvoice: number): number {
  return revenue - costThemarketer - costInvoice;
}

export function computeMargin(profit: number, revenue: number): number | null {
  if (revenue <= 0) return null;
  return (profit / revenue) * 100;
}
