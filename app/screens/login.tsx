import { ENDPOINTS } from "@/api/endpoints";
import { POST } from "@/api/methods";
import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { session } from "@/store/session";
import { Redirect } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await POST<any>(ENDPOINTS.auth.login, {
        username,
        password,
      });

      // ✅ Store token
      //   await AsyncStorage.setItem("access_token", response.access_token);
      session.setToken(response.access_token);

      setLoggedIn(true);
    } catch (error: any) {
      console.log("Login error:", error?.response || error?.message);
      Alert.alert("Login Failed", "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Redirect after login
  if (loggedIn) {
    return <Redirect href="/tabs" />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 24,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "700", color: "#00B87C" }}>
        Welcome Back!
      </Text>
      <Text style={{ color: "#777", marginTop: 6, marginBottom: 30 }}>
        Please enter your details
      </Text>

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

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          backgroundColor: "#00B87C",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Login
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
