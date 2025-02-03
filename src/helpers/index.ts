export function formatCurrency(amount: number): string {
    return `$${new Intl.NumberFormat("es-CL").format(amount)}`;
  }