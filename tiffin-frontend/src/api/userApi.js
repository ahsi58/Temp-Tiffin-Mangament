import api from "./axios";

export const getCustomerProfile = () => {
    return api.get("/users/me");
};

export const updateCustomerProfile = (data) => {
    return api.put("/users/me", data);
};

export const getVendorProfile = () => {
    return api.get("/vendors/me");
};

export const updateVendorProfile = (data) => {
    return api.put("/vendors/me", data);
};