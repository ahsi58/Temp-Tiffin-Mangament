import api from "./axios";

// Customer APIs

export const getWeeklyMenu = async () => {
    const response = await api.get("/menus");
    return response.data;
};

export const getMenuByDay = async (day) => {
    const response = await api.get(`/menus/${day}`);
    return response.data;
};

export const getMenuByDayAndMeal = async (day, mealType) => {
    const response = await api.get(`/menus/${day}/${mealType}`);
    return response.data;
};

// Vendor APIs

export const createMenu = async (data) => {
    const response = await api.post("/menus", data);
    return response.data;
};

export const updateMenu = async (id, data) => {
    const response = await api.put(`/menus/${id}`, data);
    return response.data;
};

export const deleteMenu = async (id) => {
    const response = await api.delete(`/menus/${id}`);
    return response.data;
};

export const toggleAvailability = async (id) => {
    const response = await api.patch(`/menus/${id}/availability`);
    return response.data;
};