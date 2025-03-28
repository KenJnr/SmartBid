import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet, Alert } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";

export default function ResetPasswordScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!isLoaded || !signIn) {
      Alert.alert("Error", "Authentication service is not available.");
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const result = await signIn.resetPassword({ password });
      await signOut();

      if (result.status === "complete") {
        Alert.alert("Success", "Your password has been reset successfully.", [
          { text: "OK", onPress: () => router.replace("/(auth)/login") },
        ]);
      } else {
        throw new Error("Password reset failed. Try again.");
      }
    } catch (error: unknown) {
        setLoading(false); // Stop spinner if error occurs

        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "Something went wrong.");
        }
      }
      
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <ExpoStatusBar style={theme.mode === "dark" ? "auto" : "dark"} />
      <TouchableOpacity style={[styles.backIcon, { backgroundColor: theme.colors.backIcon }]} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <Text style={[styles.heading, { color: theme.colors.text }]}>Create New Password</Text>
      
      <Text style={[styles.label, { color: theme.colors.text }]}>New Password</Text>
      <TextInput
        style={[styles.textField, { backgroundColor: theme.colors.inputField }]}
        placeholder="New password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Text style={[styles.label, { color: theme.colors.text }]}>Confirm Password</Text>
      <TextInput
        style={[styles.textField, { backgroundColor: theme.colors.inputField }]}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleResetPassword} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>RESET PASSWORD</Text>}
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
    marginBottom: 40,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
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
  button: {
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
    marginTop: 40
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
