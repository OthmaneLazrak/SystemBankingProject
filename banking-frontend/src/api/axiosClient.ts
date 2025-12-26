import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://localhost:8888", // Par défaut sur customer-service (on changera dynamiquement)
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosClient;