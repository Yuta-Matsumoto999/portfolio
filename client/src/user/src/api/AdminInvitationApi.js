import axiosClient from "./axiosClient/axiosClient";

const AdminInvitationApi = {
    updateOrCreate: () => axiosClient.post("/api/admin/v1/organization/invitation/updateOrCreate"),
    disableLink: () => axiosClient.post("/api/admin/v1/organization/disable/invitation/link")
}

export default AdminInvitationApi;