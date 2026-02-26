export const ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
  },
  healthCheck: {
    root: "",
  },
  cattle: {
    list: "/api/v1/cattle/list",
    details: (id: string) => `/cattle/${id}`,
  },
  milk: {
    record: "/milk/record",
    history: "/milk/history",
  },
  insemination: {
    create: "/api/v1/insemination/create",
    list: "/api/v1/insemination/list",
    details: (id: string) => `/api/v1/insemination/${id}`,
  },
  lactation: {
    workerRecords: "/api/v1/lactation/worker-records",
    lactatingAnimals: "/api/v1/lactation/lactating-animals",
    create: "/api/v1/lactation",
    bulk: "/api/v1/lactation/bulk",
    workerById: (id: string) => `/api/v1/lactation/worker/${id}`,
    recordById: (id: string) => `/api/v1/lactation/${id}`,
  },
};
