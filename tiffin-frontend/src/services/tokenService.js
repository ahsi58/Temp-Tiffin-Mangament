const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const TOKEN_TYPE = "tokenType";
const EXPIRES_IN = "expiresIn";
const ROLE = "role";

const tokenService = {

    setTokens(data) {
        localStorage.setItem(ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
        localStorage.setItem(TOKEN_TYPE, data.tokenType);
        localStorage.setItem(EXPIRES_IN, data.expiresIn);
        localStorage.setItem(ROLE, data.role);
    },

    updateTokens(data) {
        this.setTokens(data);
    },

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN);
    },

    getRole() {
        return localStorage.getItem(ROLE);
    },

    isLoggedIn() {
        return !!this.getAccessToken();
    },

    clearTokens() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(TOKEN_TYPE);
        localStorage.removeItem(EXPIRES_IN);
        localStorage.removeItem(ROLE);
    }

};

export default tokenService;