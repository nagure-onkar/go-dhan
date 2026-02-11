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
  // ADD THIS insemination
  insemination: {
    create: "/api/v1/insemination/create",
    list: "/api/v1/insemination/list",
    details: (id: string) => `/api/v1/insemination/${id}`,
  },

};
