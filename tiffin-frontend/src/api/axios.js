import axios from "axios";
import authService from "../services/authService";
import tokenService from "../services/tokenService";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.request.use(
    (config) => {

        const token = tokenService.getAccessToken();
        console.log("Request Token:", token);
        //console.log("Interceptor Token:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        const status = error.response?.status;

        // Only handle authentication errors
        if (status !== 401 && status !== 403) {
            return Promise.reject(error);
        }

        // Prevent infinite retry loops
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {

            if (!isRefreshing) {

                isRefreshing = true;

                refreshPromise = authService.refreshAccessToken();

            }

            const newAccessToken = await refreshPromise;

            isRefreshing = false;
            refreshPromise = null;

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);

        } catch (refreshError) {

            isRefreshing = false;
            refreshPromise = null;

            tokenService.clearTokens();

            window.location.href = "/";

            return Promise.reject(refreshError);

        }

    }

);

export default api;