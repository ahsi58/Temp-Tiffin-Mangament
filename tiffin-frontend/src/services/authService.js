import { refreshToken } from "../api/authApi";
import tokenService from "./tokenService";

const authService = {

    async refreshAccessToken() {

    const refresh = tokenService.getRefreshToken();

    console.log("Old Access:", tokenService.getAccessToken());
    console.log("Old Refresh:", refresh);

    const response = await refreshToken(refresh);

    console.log("New Tokens:", response.data);

    tokenService.updateTokens(response.data);

    console.log("Stored Access:", tokenService.getAccessToken());
    console.log("Stored Refresh:", tokenService.getRefreshToken());

    return response.data.accessToken;
}

};

export default authService;