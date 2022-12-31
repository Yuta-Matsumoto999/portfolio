import axiosClient from "./axiosClient/axiosClient";

const GeneralAuthApi = {
    initialCsrfToken: () => axiosClient.get("/sanctum/csrf-cookie"),
    register: (params) => axiosClient.post("api/general/v1/register", params),
    login: (params) => axiosClient.post("api/general/v1/login", params),
    authenticateCheck: () => axiosClient.get("api/general/v1/authenticate-check"),
    logout: () => axiosClient.post("api/general/v1/logout"),
    sendResetLink: (params) => axiosClient.post("api/general/v1/forget-password", params),
    resetPassword: (params) => axiosClient.post("api/general/v1/reset-password", params),
}

export default GeneralAuthApi;