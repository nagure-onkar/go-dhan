// import DashboardScreen from "app/screens/home/dashboard";
// import { useState } from "react";

// export default function Index() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [secure, setSecure] = useState(true);

//   return <DashboardScreen />;
// }

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import DashboardScreen from "app/screens/home/dashboard";
import React, { useCallback } from "react";
import { Alert, BackHandler } from "react-native";

export default function Index() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        AsyncStorage.getItem("access_token")
          .then((token) => {
            if (token) {
              Alert.alert("Exit App", "Do you really want to close the app?", [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: async () => {
                    try {
                      await AsyncStorage.clear();
                    } catch (error) {
                      console.log("Error clearing storage:", error);
                    }
                    BackHandler.exitApp();
                  },
                },
              ]);
            } else {
              BackHandler.exitApp();
            }
          })
          .catch((error) => {
            console.log("Error reading token:", error);
            BackHandler.exitApp();
          });

        return true; // required: prevent default behavior
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => {
        subscription.remove();
      };
    }, []),
  );

  return <DashboardScreen />;
}
