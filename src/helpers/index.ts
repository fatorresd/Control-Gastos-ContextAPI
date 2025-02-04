export function formatCurrency(amount: number): string {
    return `$${new Intl.NumberFormat("es-CL").format(amount)}`;
  }

  export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  }