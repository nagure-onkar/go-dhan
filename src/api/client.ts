import { AppConfig } from "@/config/env";
import axios from "axios";

const apiClient = axios.create({
  baseURL: AppConfig.baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request interceptor (auth, language, etc.)
apiClient.interceptors.request.use(
  async (config) => {
    // Example: add token later
    // const token = await getAuthToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error),
);

// ❌ Response interceptor (global error handling)
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("API Error:", error?.response || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
