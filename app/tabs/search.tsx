import { ENDPOINTS } from "@/api/endpoints";
import { GET } from "@/api/methods";
import AppText from "@/components/common/AppText";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

type HealthCheckResponse = {
  status: string;
  message: string;
};

export default function SearchScreen() {
  const [message, setMessage] = useState<string>("Loading...");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      GET<any>(ENDPOINTS.cattle.list)
        .then((res) => {
          if (isActive) setMessage(`Loaded ${res.data.length} cattle`);
        })
        .catch(() => {
          if (isActive) setMessage("Failed to connect to API ❌");
        });

      // cleanup if screen unfocuses during fetch
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <ScreenWrapper>
      <AppText>Search</AppText>
      <AppText>{message}</AppText>
    </ScreenWrapper>
  );
}
