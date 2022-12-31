import axios from "axios";
const BASE_URL = "http://localhost";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    httpOnly: true
});

// response intercept
axiosClient.interceptors.response.use(async (response) => {
    return response.data;
    }, 
    (err) => {
        throw err.response;
    }
);

export default axiosClient;