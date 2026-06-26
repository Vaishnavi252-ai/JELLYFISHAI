function detectSystemIntent(requirements: ProjectRequirement[]): string {

  const text = requirements
    .map(r => `${r.title} ${r.description}`)
    .join(" ")
    .toLowerCase();

  if (text.includes("login") || text.includes("authentication") || text.includes("signup")) {
    return "AUTH_SYSTEM";
  }

  if (text.includes("cart") || text.includes("ecommerce")) {
    return "CART_SYSTEM";
  }

  if (text.includes("payment")) {
    return "PAYMENT_SYSTEM";
  }

  return "GENERIC_SYSTEM";
}