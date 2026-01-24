import { AppConfig } from "@/config/env";
import apiClient from "./client";

const isDev = __DEV__ && AppConfig.env == "dev";

export const GET = async <T>(url: string, params?: object): Promise<T> => {
  if (isDev) {
    console.log("📡 GET:", {
      url,
      params,
    });
  }

  try {
    const response = await apiClient.get<T>(url, { params });

    if (isDev) {
      console.log("✅ GET SUCCESS:", {
        url,
        response,
      });
    }

    return response;
  } catch (error: any) {
    if (isDev) {
      console.log("❌ GET ERROR:", {
        url,
        error: error?.response || error?.message,
      });
    }
    throw error;
  }
};

export const POST = <T>(url: string, data?: object) =>
  apiClient.post<T>(url, data);

export const PUT = <T>(url: string, data?: object) =>
  apiClient.put<T>(url, data);

export const PATCH = <T>(url: string, data?: object) =>
  apiClient.patch<T>(url, data);

export const DELETE = <T>(url: string) => apiClient.delete<T>(url);
