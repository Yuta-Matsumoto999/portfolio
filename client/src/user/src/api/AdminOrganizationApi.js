import axiosClient from "./axiosClient/axiosClient";

const AdminOrganizationApi = {
    create: (params) => axiosClient.post("/api/admin/v1/organization/create", params),
}

export default AdminOrganizationApi;