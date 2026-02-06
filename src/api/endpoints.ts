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
  // for dashboard stats and activities
  dashboard: {
    stats: "/dashboard/stats",
    activities: "/dashboard/activities",
  },
};

export const HEAT_ON_HEAT = "/heat/on-heat";

