export const buildSmartPrompt = (
  intent: string,
  architecture: any,
  techStack: any
) => {

  return `
You are a senior software architect.

Generate a COMPLETE ${intent} system.

MANDATORY MODULES:
${architecture.modules.join(", ")}

STRICT RULES:

If AUTH_SYSTEM:
You MUST implement:
- Password hashing
- JWT authentication
- Login API
- Signup API
- User database model
- Auth middleware

If CART_SYSTEM:
You MUST implement:
- Cart state logic
- Quantity update logic
- Total calculation

If PAYMENT_SYSTEM:
You MUST implement:
- Transaction validation
- Payment flow logic

Do NOT skip logic implementation.
Do NOT generate UI-only solution.
`;
};