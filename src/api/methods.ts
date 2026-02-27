import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

/* ================= LOGIN ================= */

export const loginApi = async (payload: {
  username: string;
  password: string;
}) => {
  const response = await apiClient.post(
    ENDPOINTS.LOGIN,
    payload
  );
  return response.data;
};

/* ================= ADD WORKER ================= */

export const addWorkerApi = async (payload: any) => {
  const response = await apiClient.post(
    ENDPOINTS.ADD_WORKER,
    payload
  );
  return response.data;
};

/* ================= GET ALL WORKERS ================= */

export const getWorkersApi = async () => {
  const response = await apiClient.get(
    ENDPOINTS.GET_WORKERS
  );
  return response.data;
};

/* ================= GET WORKER BY ID ================= */

export const getWorkerByIdApi = async (id: string) => {
  const response = await apiClient.get(
    ENDPOINTS.GET_WORKER_BY_ID(id)
  );
  return response.data;
};

/* ================= UPDATE WORKER ================= */

export const updateWorkerApi = async (
  id: string,
  payload: any
) => {
  const response = await apiClient.patch(
    ENDPOINTS.UPDATE_WORKER(id),
    payload
  );
  return response.data;
};

/* ================= DELETE WORKER ================= */

export const deleteWorkerApi = async (id: string) => {
  const response = await apiClient.delete(
    ENDPOINTS.DELETE_WORKER(id)
  );
  return response.data;
};

/* ================= UPLOAD AADHAAR ================= */

export const uploadAadharApi = async (
  id: string,
  image: any
) => {
  const formData = new FormData();

  formData.append("file", {
    uri: image.uri,
    name: "aadhaar.jpg",
    type: "image/jpeg",
  } as any);

  const response = await apiClient.post(
    ENDPOINTS.UPLOAD_AADHAR(id),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
