import axiosClient from "./axiosClient/axiosClient";

const AdminAuthApi = {
    initialCsrfToken: () => axiosClient.get("/sanctum/csrf-cookie"),
    register: (params) => axiosClient.post("api/admin/v1/register", params),
    login: (params) => axiosClient.post("api/admin/v1/login", params),
    authenticateCheck: () => axiosClient.get("api/admin/v1/authenticate-check"),
    logout: () => axiosClient.post("api/admin/v1/logout"),
    sendResetLink: (params) => axiosClient.post("api/admin/v1/forget-password", params),
    resetPassword: (params) => axiosClient.post("api/admin/v1/reset-password", params),
    checkUrl: (params) => axiosClient.post('/api/admin/v1/authenticate-organizationKey-check', params)
}

export default AdminAuthApi;