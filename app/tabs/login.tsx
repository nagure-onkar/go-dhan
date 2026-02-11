import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://astrabytte-ai.onrender.com";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log("LOGIN RESPONSE ", data);

      if (!response.ok) {
        setError(data?.detail || "Invalid username or password");
        setLoading(false);
        return;
      }

     
      const { access_token, token_type } = data;

      
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("token_type", token_type);

      setLoading(false);

      router.replace("/screens/addWorker");

    } catch (err) {
      console.log("LOGIN ERROR ", err);
      setLoading(false);
      setError("Server not reachable");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7eaea",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 14,
          padding: 24,
          elevation: 4,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "700",
            color: "#00B87C",
            marginBottom: 6,
          }}
        >
          Welcome Back!
        </Text>

        <Text style={{ color: "#777", marginBottom: 25 }}>
          Please enter your details
        </Text>

        {/* Username */}
        <Text style={{ marginBottom: 6, fontWeight: "500" }}>
          Username / Email <Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 14,
            marginBottom: 18,
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
            borderColor: error ? "orange" : "#ddd",
            borderRadius: 10,
            paddingHorizontal: 14,
          }}
        >
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            placeholder="Enter password"
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

        {error ? (
          <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>
        ) : null}

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#00B87C",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
