import axiosClient from "./axiosClient/axiosClient";

const AdminTeamApi = {
    getTeamAndUser: (params) => axiosClient.post("api/admin/v1/team/getTeamAndUser", params),
    create: (params) => axiosClient.post("api/admin/v1/team/register"),
    update: (params) => axiosClient.post("api/admin/v1/team/update", params),
    delete: (params) => axiosClient.delete("api/admin/v1/team/delete", params),
    addUser: (params) => axiosClient.post("api/admin/v1/team/addUser", params)
}

export default AdminTeamApi;