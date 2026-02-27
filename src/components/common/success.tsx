// Success.tsx
import LottieView from "lottie-react-native";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

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
    </View>
  );
};

export default Success; // This is the most important line!
