import { ENDPOINTS } from "@/api/endpoints";
import { Worker } from "@/types/worker";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { ENDPOINTS } from "@/constants/endpoints";

export const getWorkers = async (): Promise<Worker[]> => {
  try {
    const data = await AsyncStorage.getItem("User");
    console.log("Retrieved user data from AsyncStorage:", JSON.parse(data));
    const user = data ? JSON.parse(data) : null;
    let url="https://astrabytte-ai.onrender.com"+ENDPOINTS.lactation.workerRecords;
    console.log("Fetching worker records from:", ENDPOINTS.lactation.workerRecords);
    //const response = await fetch(url);
    let res=await fetch(url, {
 
  headers: {
    'Content-Type': 'application/json', 
    "access_token": "Bearer " + user?.access_token || "",
  }});

    const records = await res.json();
    console.log("Worker records:", records);
    const uniqueWorkers: Worker[] = Object.values(
      records.reduce((acc: any, item: any) => {
        acc[item.worker_id] = {
          id: item.worker_id,
          name: item.worker_name,
          gender: "-",
          mobile: "-",
          cattle: item.cattleId ?? 0,
          joined: "-",
          address: "-",
        };
        return acc;
      }, {})
    );

    return uniqueWorkers;
  } catch (error) {
    console.log("❌ getWorkers error:", error);
    throw error;
  }
};