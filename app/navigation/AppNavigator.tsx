export const reproductionCycleRouteMap: Record<string, string> = {
  "1": "/lifecycle/calf",
  "2": "/lifecycle/young-calf",
  "3": "/screens/liveStock/cattleReproduction/heifer",
  "4": "/screens/liveStock/cattleReproduction/onHeat",
  "5": "/screens/liveStock/cattleReproduction/insemination",
  "6": "/screens/liveStock/cattleReproduction/pregnancyTest",
  "7": "/screens/liveStock/cattleReproduction/dryOff",
  "8": "/screens/liveStock/cattleReproduction/calved",
};

export const LiveStockScreen = "/screens/liveStock/liveStock";

export const liveStockRouteMap = {
  Manage_Activities:
    "/screens/liveStock/cattleReproduction/cattleReproductionCycle",
  Vaccination: "/screens/liveStock/vaccination",
  Assessment: "/screens/liveStock/assessment",
} as const;
