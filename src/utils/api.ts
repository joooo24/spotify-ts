import axios from "axios";
import { SPORTY_BASE_URI } from "../configs/commonConfig";

const api = axios.create({
    baseURL: SPORTY_BASE_URI,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return request;
});

export default api;
