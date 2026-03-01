import { AppConfig } from "@/config/env";
import { session } from "@/store/session";
import axios from "axios";

const apiClient = axios.create({
  baseURL: AppConfig.baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = session.getToken();
    // const token = AsyncStorage.getItem("access_token");
    console.log("Token from Async Storage: ", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ❌ Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("API Error:", error?.response || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
