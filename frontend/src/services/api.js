import axios from "axios";

const api = axios.create({
  baseURL: "https://volunteer-registration-cun1.onrender.com/api",
});

export default api;
