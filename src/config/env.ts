type Environment = "dev" | "uat" | "prod";

const ENV: Environment = "dev";

const CONFIG = {
  dev: {
    baseURL: "http://192.168.1.5:8000/",
  },
  uat: {
    baseURL: "http://192.168.1.5:8000/",
  },
  prod: {
    baseURL: "https://api.godhan.com",
  },
};

export const AppConfig = {
  env: ENV,
  baseURL: CONFIG[ENV].baseURL,
};
