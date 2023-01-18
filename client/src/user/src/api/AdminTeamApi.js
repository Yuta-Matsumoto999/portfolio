import axiosClient from "./axiosClient/axiosClient";

const AdminTeamApi = {
    getTeamAndUser: (params) => axiosClient.post("api/admin/v1/team/getTeamAndUser", params),
    create: (params) => axiosClient.post("api/admin/v1/team/register", params),
    update: (params) => axiosClient.post("api/admin/v1/team/update", params),
    reOrder: (params) => axiosClient.post("api/admin/v1/team/reOrder", params),
    delete: (params) => axiosClient.delete("api/admin/v1/team/delete", params),
    replaceMember: (params) => axiosClient.post("api/admin/v1/team/replaceMember", params)
}

export default AdminTeamApi;