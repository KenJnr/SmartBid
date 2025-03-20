import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity,  KeyboardAvoidingView, ScrollView } from "react-native";
import { AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"seller" | "buyer">("buyer");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const { signUp, isLoaded: signUpLoaded, setActive } = useSignUp();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const router = useRouter();

  if (!signUpLoaded || !signInLoaded) return <Text>Loading...</Text>;

  const handleSignup = async () => {
    if (!signUp) {
      Alert.alert("Sign-up not available. Try again.");
      return;
    }
    try {
      await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: { userType, firstName: "User", lastName: "Test" }, // Store name in metadata
      });
  
      // Prepare for email verification
      await signUp.prepareEmailAddressVerification();
      setPendingVerification(true);
      Alert.alert("Check your email for the verification code!");
    } catch (error: any) {
      console.error("Signup Error:", error);
      Alert.alert(error.errors?.[0]?.message || "Signup failed. Try again.");
    }
  };
  

  const handleVerify = async () => {
    if (!signUp || !setActive) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status !== "complete") {
        throw new Error("Verification failed. Try again.");
      }

      await setActive({ session: completeSignUp.createdSessionId });

      Alert.alert("Verification successful!");
      router.replace("/dashboard/dashboard");
    } catch (error: any) {
      console.error("Verification Error:", error);
      Alert.alert(error.errors?.[0]?.message || "Invalid code. Try again.");
    }
  };

  const handleLogin = async () => {
    if (!signIn || !setActive) {
      Alert.alert("Login not available. Try again.");
      return;
    }
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
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {!pendingVerification ? (
        <>

          <Text style={styles.appName}>SmartBid</Text>
          <Text style={styles.subtitle}>Welcome to SmartBid.
            Create your account and select a role to get started.
          </Text>

          <Text style={styles.label}>Email:</Text>
          <TextInput
          style={styles.inputField} 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none" 
          placeholder="m@example.com"
          keyboardType= "email-address"
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
          style={styles.inputField} 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          placeholder="password"
          />

          <Text style={styles.roleText}>Please select whether you want to sell or buy products</Text>
          <Text style={styles.roleIntro}>I want to...</Text>
          <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => setUserType("buyer")}
          >
            <View  style={[styles.Icon, { backgroundColor: "#E9EFFC", borderRadius: 24, padding: 12 }]}>
            <AntDesign name="shoppingcart" size={24} color="#4579EE" />
            </View>
            <Text style={styles.cardTitle}>Buy Products</Text>
            <Text style={styles.cardText}>Bid on items and make purchases</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => setUserType("seller")}
          >
            <View style={[styles.Icon, { backgroundColor: "#E9EFFC", borderRadius: 24, padding: 12 }]}>
            <Fontisto name="shopping-store" size={24} color="#4579EE" />
            </View>
            <Text style={styles.cardTitle}>Sell Products</Text>
            <Text style={styles.cardText}>List items and accept bids</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.conclude}>
            <Text style={styles.concludeText}>Already have an account?</Text>
            <TouchableOpacity style={styles.concludeIcon} onPress={() => router.push("/(auth)/login")}>
              <MaterialIcons name="arrow-right-alt" size={40} color="#4579EE" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
          style={styles.button}
          onPress={handleSignup}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Enter Verification Code:</Text>
          <TextInput
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
          />
          <Button title="Verify Email" onPress={handleVerify} />
        </>
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    // backgroundColor: "white"
  },
  appName: {
    fontSize: 30,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "",
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#666",
    marginBottom: 40
  },
  label:{
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#333",
    alignSelf: "flex-start",
    paddingBottom: 5
  },
  inputField: {
    width: "100%",
    padding: 16,
    borderColor: "#ccc",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16
  },
  roleText: {
    width:"100%",
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#854D0E",
    backgroundColor: "#FEFCE8",
    textAlign: "center",
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  roleIntro:{
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16, // Adds space between the cards,
    marginBottom: 20
  },
  card:{
    backgroundColor: "white",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center", // Ensures content is centered
    justifyContent: "center",
    width: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  cardTitle:{
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  cardText:{
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  Icon:{
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  conclude:{
    flexDirection: "row",
    gap: 12,
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 30
  },
  concludeText:{
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#666"
  },
  concludeIcon:{
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#4579EE",
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
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})
