import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" }}>
      
      {/* Heading */}
      <Text style={{ fontSize: 28, fontWeight: "700", color: "#00B87C" }}>
        Welcome Back!
      </Text>
      <Text style={{ color: "#777", marginTop: 6, marginBottom: 30 }}>
        Please enter your details
      </Text>

      {/* Username */}
      <Text style={{ marginBottom: 6, fontWeight: "500" }}>
        Username <Text style={{ color: "red" }}>*</Text>
      </Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 14,
          marginBottom: 20,
        }}
      />

      {/* Password */}
      <Text style={{ marginBottom: 6, fontWeight: "500" }}>
        Password <Text style={{ color: "red" }}>*</Text>
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#00B87C",
          borderRadius: 10,
          paddingHorizontal: 14,
          marginBottom: 30,
        }}
      >
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={secure}
          value={password}
          onChangeText={setPassword}
          style={{ flex: 1, paddingVertical: 14 }}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#00B87C",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
