export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
  },
  healthCheck: {
    root: "",
  },
  cattle: {
    list: "/cattle",
    details: (id: string) => `/cattle/${id}`,
  },
  milk: {
    record: "/milk/record",
    history: "/milk/history",
  },
};
