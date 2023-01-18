import axiosClient from "./axiosClient/axiosClient";

const AdminSearchApi = {
    getSearchItem: (params) => axiosClient.get('/api/admin/v1/search/getSearchItems', params),
    getAttachSearchItems: (params) => axiosClient.post('/api/admin/v1/search/getAttachSearchItems', params),
    attachSearchItem: (params) => axiosClient.post('/api/admin/v1/search/attachSearchItem', params),
    detachSearchItem: (params) => axiosClient.post("/api/admin/v1/search/detachSearchItem", params),
    createSearchItem: (params) => axiosClient.post("/api/admin/v1/search/createSearchItem", params),
    updateSearchItem: (params) => axiosClient.post("/api/admin/v1/search/updateSearchItem", params),
    deleteSearchItem: (params) => axiosClient.post("/api/admin/v1/search/deleteSearchItem", params),
}

export default AdminSearchApi;