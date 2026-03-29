export const ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    refresh: "/api/v1/auth/refresh",
  },
  administration: {
    profile: "/api/v1/user/profile",
    combinedRegistry: "/api/v1/combined-registry",
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

  dashboard: {
    stats: "/api/v1/dashboard/stats",
    activities: "/api/v1/dashboard/activities",
  },
};

export const HEAT_ON_HEAT = "/heat/on-heat";
