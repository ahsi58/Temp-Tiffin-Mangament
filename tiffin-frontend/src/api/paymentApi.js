import api from "./axios";

// ============================================================
// Sharwari's work - Razorpay Payment APIs
// ============================================================

/*
 * Create Razorpay order from customer's cart.
 *
 * Backend:
 * POST /cart/checkout/create-order
 *
 * Response:
 * {
 *   razorpayOrderId,
 *   razorpayKeyId,
 *   amount,
 *   currency
 * }
 */

export const createRazorpayOrder = () => {

    return api.post("/cart/checkout/create-order");

};


/*
 * Verify Razorpay payment.
 *
 * Backend:
 * POST /cart/checkout/verify
 *
 * Request body:
 * {
 *   razorpayOrderId,
 *   razorpayPaymentId,
 *   razorpaySignature
 * }
 */

export const verifyPayment = (paymentData) => {

    return api.post(
        "/cart/checkout/verify",
        paymentData
    );

};

// ============================================================
// End of Sharwari's work
// ============================================================

