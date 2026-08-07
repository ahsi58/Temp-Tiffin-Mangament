import api from "./axios";

// Get current customer's cart
export const getCart = () => {
    return api.get("/cart");
};

// Add a meal to cart
export const addToCart = (menuId, quantity = 1) => {
    return api.post("/cart/items", {
        menuId,
        quantity
    });
};

// Update quantity of a meal in cart
export const updateCartItem = (menuId, quantity) => {
    return api.put(`/cart/items/${menuId}`, {
        quantity
    });
};

// Remove a meal from cart
export const removeFromCart = (menuId) => {
    return api.delete(`/cart/items/${menuId}`);
};

// Clear entire cart
export const clearCart = () => {
    return api.delete("/cart");
};

