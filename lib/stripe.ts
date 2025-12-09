import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables
const stripeKey = process.env.STRIPE_SECRET_KEY;

// Safe fallback: Warn if the key is missing but don't crash the app during build/dev
if (!stripeKey) {
    console.warn('⚠️ STRIPE_SECRET_KEY is missing. Stripe features will not work correctly.');
}

// Export the Stripe instance
// We use a placeholder key if missing to ensure the instance is typed and created,
// but actual API calls will fail if the key is invalid.
export const stripe = new Stripe(stripeKey ?? 'sk_test_placeholder_key', {
    apiVersion: '2023-10-16',
    typescript: true,
});
