export const BASE_URL = "https://astrabytte-ai.onrender.com";

export const ENDPOINTS = {
  LOGIN: "/api/v1/auth/login",

  /* ================= VET ================= */
  CREATE_VET: "/api/v1/vet-registry/",
  LIST_VET: "/api/v1/vet-registry/",
  GET_VET: (id: string) => `/api/v1/vet-registry/${id}`,
  UPDATE_VET: (id: string) => `/api/v1/vet-registry/${id}`,
  DELETE_VET: (id: string) => `/api/v1/vet-registry/${id}`,

  /* ================= WORKER ================= */
  ADD_WORKER: "/api/v1/worker-registry/",
  GET_WORKERS: "/api/v1/worker-registry/",
  GET_WORKER_BY_ID: (id: string) =>
    `/api/v1/worker-registry/${id}`,
  UPDATE_WORKER: (id: string) =>
    `/api/v1/worker-registry/${id}`,
  DELETE_WORKER: (id: string) =>
    `/api/v1/worker-registry/${id}`,
  UPLOAD_AADHAR: (id: string) =>
    `/api/v1/worker-registry/${id}/upload-aadhar`,
};
