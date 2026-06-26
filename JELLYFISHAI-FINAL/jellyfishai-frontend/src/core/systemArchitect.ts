export const buildArchitecture = (intent: string) => {

  switch(intent) {

    case "AUTH_SYSTEM":
      return {
        modules: [
          "Login UI",
          "Signup UI",
          "Auth API",
          "Password Hashing",
          "JWT Token",
          "Protected Routes",
          "Database Model"
        ]
      };

    case "CART_SYSTEM":
      return {
        modules: [
          "Product List",
          "Add to Cart",
          "Remove from Cart",
          "Update Quantity",
          "Cart State",
          "Total Calculation"
        ]
      };

    default:
      return {
        modules: ["Basic UI"]
      };
  }
};ś