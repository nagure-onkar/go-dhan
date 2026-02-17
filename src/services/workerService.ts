import { Worker } from "@/types/worker";

// 🔥 Mock data (temporary)
const mockWorkers: Worker[] = [
  {
    id: "wp-001",
    name: "Shamrao Vasudev Patil",
    gender: "Male",
    mobile: "9926658020",
    cattle: 6,
    joined: "Jan 1, 2026",
    address: "Hanuman Nagar, Gijawane",
  },
  {
    id: "wp-002",
    name: "Ravi Arjun Khot",
    gender: "Male",
    mobile: "9926658121",
    cattle: 4,
    joined: "Jan 2, 2026",
    address: "Hanuman Nagar, Gijawane",
  },
];

// Simulate API delay
export const getWorkers = async (): Promise<Worker[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWorkers);
    }, 800); // simulate network delay
  });
};
