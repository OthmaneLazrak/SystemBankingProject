import axios from "axios";

const reportingAxios = axios.create({
    baseURL: "http://localhost:8085", // direct sur le reporting-service
});

export default reportingAxios;
