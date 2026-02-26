import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.5:8000", // 👈 change to your backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;