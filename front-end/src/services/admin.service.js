import axios from "axios";

import authHeader from "./auth-header";
const API_URL = "http://localhost:9001/";
const statistic = async () => {
    let data = await axios.get(API_URL + "statistics", {
        headers: authHeader(),
    }).then((response) => {
        return response.data;
    });
    return data.data
};

const adminService = {
    statistic,
};
export default adminService;
