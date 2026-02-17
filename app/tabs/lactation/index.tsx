import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

import AppText from "@/components/common/AppText";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { useLanguage } from "@/constants/localization/useLanguage";
import { commonPageStyles } from "@/constants/styles/pageStyling";

import { Worker } from "@/types/worker";
import { getWorkers } from "@/services/workerService";

export default function LactationDashboard() {
  const router = useRouter();
  const { t } = useLanguage();

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const data = await getWorkers();
      setWorkers(data);
    } catch (err) {
      setError("Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={commonPageStyles.container}>
          <ActivityIndicator size="large" />
        </View>
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <View style={commonPageStyles.container}>
          <AppText>{error}</AppText>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={commonPageStyles.container}>
        <AppText style={commonPageStyles.title}>
          {t.lactation}
        </AppText>

        <FlatList
          data={workers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 16,
                borderRadius: 12,
                marginBottom: 14,
                elevation: 2,
              }}
            >
              <AppText style={{ fontWeight: "600" }}>
                {item.name}
              </AppText>
              <AppText>ID: {item.id}</AppText>
              <AppText>Assigned Cattle: {item.cattle}</AppText>
              <AppText>Mobile: {item.mobile}</AppText>

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: "#E8FFF1",
                  padding: 10,
                  borderRadius: 8,
                  alignItems: "center",
                }}
                onPress={() =>
                  router.push({
                    pathname: "/tabs/lactation/record",
                     params: {
                        workerId: item.id,
                        name: item.name,
                },
              })
            }

              >
                <AppText style={{ color: "#0A8F47", fontWeight: "600" }}>
                  Record Milking
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}
