import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useSignIn } from "@clerk/clerk-expo";

export default function Signin() {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New state for button loading

  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();

  const handleLogin = async () => {
    if (!signIn || !setActive) {
      Alert.alert("Login not available. Try again.");
      return;
    }

    setLoading(true); // Show loader in button

    try {
      const signInAttempt = await signIn.create({ identifier: email, password });

      if (signInAttempt.status !== "complete") {
        throw new Error("Login not completed.");
      }

      await setActive({ session: signInAttempt.createdSessionId });

      router.replace("/dashboard/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);
      Alert.alert(error.errors?.[0]?.message || "Login failed. Try again.");
    } finally {
      setLoading(false); // Hide loader after login attempt
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ExpoStatusBar style={theme.mode === "dark" ? "auto" : "dark"} />

      <TouchableOpacity style={[styles.backIcon, { backgroundColor: theme.colors.backIcon }]} onPress={() => router.push("/(auth)/signup")}>
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={[styles.heading, { color: theme.colors.text }]}>Welcome Back</Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
      <TextInput
        style={[styles.textField, { backgroundColor: theme.colors.inputField }]}
        placeholder="m@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
      <TextInput
        style={[styles.textField, { backgroundColor: theme.colors.inputField }]}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.forget}>
        <Text style={[styles.forgetText, { color: theme.colors.cardSubTitle }]}>Forgot your password?</Text>
        <TouchableOpacity style={styles.forgetIcon} onPress={() => router.push("/(auth)/forgot-password")}>
          <MaterialIcons name="arrow-right-alt" size={40} color="#ff7d00" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>LOGIN</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#103957",
  },
  backIcon: {
    marginTop: 20,
    alignSelf: "flex-start",
    marginBottom: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
  },
  heading: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: 60,
    color: "#fff",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#fff",
    paddingBottom: 5,
  },
  textField: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  forget: {
    flexDirection: "row",
    gap: 12,
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  forgetText: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#D1E8FF",
  },
  forgetIcon: {
    alignSelf: "flex-end",
  },
  button: {
    backgroundColor: "#ff7d00",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "Poppins",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
