import { AppConfig } from "@/config/env";
import apiClient from "./client";

const isDev = __DEV__ && AppConfig.env == "dev";

const BASE_URL = "https://astrabytte-ai.onrender.com";

const withBaseUrl = (url: string) => `${BASE_URL}${url}`;

export const GET = async <T>(url: string, params?: object): Promise<T> => {
  const finalUrl = withBaseUrl(url);

  if (isDev) {
    console.log("📡 GET:", { url: finalUrl, params });
  }

  try {
    const response = await apiClient.get<T>(finalUrl, { params });

    if (isDev) {
      console.log("✅ GET SUCCESS:", { url: finalUrl, response });
    }

    return response.data;
  } catch (error: any) {
    if (isDev) {
      console.log("❌ GET ERROR:", {
        url: finalUrl,
        error: error?.response || error?.message,
      });
    }
    throw error;
  }
};

export const POST = async <T>(url: string, data?: object): Promise<T> => {
  const finalUrl = withBaseUrl(url);
  if (isDev) {
    console.log("📡 POST:", { url: finalUrl, data });
  }

  try {
    const response = await apiClient.post<T>(finalUrl, data);

    if (isDev) {
      console.log("✅ POST SUCCESS:", { url: finalUrl, response });
    }

    return response;
  } catch (error: any) {
    if (isDev) {
      console.log("❌ POST ERROR:", {
        url: finalUrl,
        error: error?.response || error?.message,
      });
    }
    throw error;
  }
};

export const PUT = <T>(url: string, data?: object) =>
  apiClient.put<T>(withBaseUrl(url), data);

export const PATCH = <T>(url: string, data?: object) =>
  apiClient.patch<T>(withBaseUrl(url), data);

export const DELETE = <T>(url: string) => apiClient.delete<T>(withBaseUrl(url));
