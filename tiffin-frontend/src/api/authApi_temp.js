import publicApi from "./publicApi";

export const login = (data) => {
    return publicApi.post("/auth/login", data);
};

export const register = (data) => {
    return publicApi.post("/auth/register", data);
};

export const refreshToken = (refreshTokenValue) => {
    return publicApi.post("/auth/refresh", {
        refreshToken: refreshTokenValue
    });
};