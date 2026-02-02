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
};
