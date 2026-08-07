import api from "./axios";

// ============================================================
// Sharwari's work - Order APIs
// ============================================================

/*
 * Get customer's order history.
 *
 * Backend:
 * GET /orders/history
 */
export const getOrderHistory = () => {

    return api.get("/orders/history");

};


/*
 * Get a specific order.
 *
 * Backend:
 * GET /orders/{id}
 */
export const getOrderById = (orderId) => {

    return api.get(`/orders/${orderId}`);

};


/*
 * Vendor gets all customer orders.
 *
 * Backend:
 * GET /orders/all
 */
export const getAllOrders = () => {

    return api.get("/orders/all");

};


/*
 * Vendor updates order status.
 *
 * Backend:
 * PUT /orders/{id}/status
 *
 * Request:
 * {
 *   status: "PREPARING"
 * }
 */
export const updateOrderStatus = (orderId, status) => {

    return api.put(
        `/orders/${orderId}/status`,
        {
            status
        }
    );

};

// ============================================================
// End of Sharwari's work
// ============================================================

