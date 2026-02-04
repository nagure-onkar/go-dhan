// Success.tsx
import LottieView from "lottie-react-native";
import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface SuccessProps {
  style?: StyleProp<ViewStyle>;
}

const Success = ({ style }: SuccessProps) => {
  return (
    <View style={style}>
      <LottieView
        source={require("./success.json")} // Ensure the path to your JSON is correct
        style={{ flex: 1 }}
        autoPlay
        loop={false}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 170,
        }}
      >
        Added Successfully!
      </Text>
    </View>
  );
};

export default Success; // This is the most important line!
