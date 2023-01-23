import axiosClient from "./axiosClient/axiosClient";

const AdminPlanApi = {
    getPlans: () => axiosClient.post("/api/admin/v1/plan/getPlans"),
    attachPlan: (params) => axiosClient.post("/api/admin/v1/plan/attach", params),
}

export default AdminPlanApi;