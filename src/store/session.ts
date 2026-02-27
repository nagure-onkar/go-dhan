import { ENDPOINTS } from "@/api/endpoints";
import { POST } from "@/api/methods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

class SessionStore {
  accessToken: string | null = null;
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

  async setToken(token: string) {
    this.accessToken = token;
    await AsyncStorage.setItem("access_token", token);
    this.startAutoRefresh();
  }

  getToken() {
    return this.accessToken;
  }

  async clear() {
    this.accessToken = null;
    await AsyncStorage.removeItem("access_token");
    this.stopAutoRefresh();
  }

  private startAutoRefresh() {
    if (this.refreshInterval) return;

    this.refreshInterval = setInterval(
      async () => {
        try {
          if (!this.accessToken) return;

          console.log("🔄 Refreshing token...");

          const response = await POST<any>(ENDPOINTS.auth.refresh);

          console.log("response:", response);

          const newToken = response?.access_token;

          if (!newToken) {
            throw new Error("No access token returned");
          }

          console.log("✅ New Token:", newToken);

          this.accessToken = newToken;
          await AsyncStorage.setItem("access_token", newToken);

          console.log("✅ Token refreshed successfully");
        } catch (error) {
          console.log("❌ Token refresh failed → Logging out");

          await this.handleRefreshFailure();
        }
      },
      15 * 60 * 1000,
    ); // 1 minute (change as needed)
  }

  private stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  private async handleRefreshFailure() {
    await AsyncStorage.clear();
    this.stopAutoRefresh();
    this.accessToken = null;

    router.replace("/screens/login"); // redirect to login screen
  }
}

export const session = new SessionStore();

// import { ENDPOINTS } from "@/api/endpoints";
// import { POST } from "@/api/methods";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";

// class SessionStore {
//   private accessToken: string | null = null;
//   private refreshInterval: NodeJS.Timeout | null = null;

//   // ✅ Set token
//   async setToken(token: string | null) {
//     this.accessToken = token;

//     if (token) {
//       await AsyncStorage.setItem("access_token", token);
//       this.startAutoRefresh();
//     } else {
//       await AsyncStorage.removeItem("access_token");
//       this.stopAutoRefresh();
//     }
//   }

//   // ✅ Get token
//   getToken() {
//     return this.accessToken;
//   }

//   // ✅ Clear session manually
//   async clear() {
//     this.accessToken = null;
//     this.stopAutoRefresh();
//     await AsyncStorage.removeItem("access_token");
//   }

//   // ✅ Restore session on app start
//   async restore() {
//     const token = await AsyncStorage.getItem("access_token");

//     if (token) {
//       this.accessToken = token;
//       this.startAutoRefresh();
//       return true;
//     }

//     return false;
//   }

//   // 🔄 Auto refresh every 15 minutes
//   private startAutoRefresh() {
//     if (this.refreshInterval) return;

//     this.refreshInterval = setInterval(
//       async () => {
//         try {
//           if (!this.accessToken) return;

//           console.log("🔄 Refreshing token...");

//           const response = await POST<any>(ENDPOINTS.auth.refresh);

//           console.log("response: ", response);

//           const newToken = response.access_token;

//           console.log("\nNew Token: ", newToken);

//           this.accessToken = newToken;
//           await AsyncStorage.setItem("access_token", newToken);

//           console.log("✅ Token refreshed successfully");
//         } catch (error) {
//           AsyncStorage.clear();
//           console.log("❌ Token refresh failed → Logging out");

//           await this.handleRefreshFailure();
//         }
//       },
//       0.1 * 60 * 1000,
//     ); // 15 minutes
//   }

//   // 🛑 Stop refresh
//   private stopAutoRefresh() {
//     if (this.refreshInterval) {
//       clearInterval(this.refreshInterval);
//       this.refreshInterval = null;
//     }
//   }

//   // 🚨 If refresh fails → logout
//   private async handleRefreshFailure() {
//     await this.clear();
//     console.log("Token Expired.... Going to login...");
//     router.replace("/screens/login"); // 👈 redirect to login screen
//   }
// }

// export const session = new SessionStore();
