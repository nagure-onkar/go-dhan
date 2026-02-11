import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function VaccinationScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Vaccination" }} />

      <View>
        <Text>Comming Soon</Text>
      </View>
    </>
  );
}
