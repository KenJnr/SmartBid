import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity,  KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";
import { useTheme } from "@/src/context/ThemeContext";
import { AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function AuthScreen() {
  const {theme} = useTheme();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"seller" | "buyer">("buyer");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);


  const otpRefs = useRef<(TextInput | null)[]>([]);

  const { signUp, isLoaded: signUpLoaded, setActive } = useSignUp();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const router = useRouter();

  if (!signUpLoaded || !signInLoaded) return <Text>Loading...</Text>;

  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

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
      setLoading(false); // Stop spinner if error occurs
      console.error("Signup Error:", error);
      Alert.alert(error.errors?.[0]?.message || "Signup failed. Try again.");
    }
  };
  

  const handleVerify = async () => {
    if (!signUp || !setActive) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp.join(""),
      });

      if (completeSignUp.status !== "complete") {
        throw new Error("Verification failed. Try again.");
      }

      await setActive({ session: completeSignUp.createdSessionId });

      router.replace("/dashboard/dashboard");
    } catch (error: any) {
      console.error("Verification Error:", error);
      Alert.alert(error.errors?.[0]?.message || "Invalid code. Try again.");
    }
  };

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  if (!signUpLoaded || !signInLoaded) return <Text>Loading...</Text>;


  const handleResendCode = async () => {
    if (!signUp || resendCooldown > 0) return;
    setResendLoading(true);
    try {
      await signUp.prepareEmailAddressVerification();
      Alert.alert("A new verification code has been sent to your email.");
      setResendCooldown(30); 
    } catch (error: any) {
      console.error("Resend Code Error:", error);
      Alert.alert("Failed to resend code. Try again later.");
    } finally {
      setResendLoading(false);
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
    <ScrollView style={{backgroundColor: theme.colors.background, flexGrow: 1}}>
    <View style={styles.container}>
    <ExpoStatusBar style={theme.mode === "dark" ? "auto" : "dark" } />
      {!pendingVerification ? (
        <>

          <Text style={[styles.appName, {color: theme.colors.text}]}>SmartBid</Text>
          <Text style={[styles.subtitle, {color: theme.colors.cardSubTitle}]}>Welcome to SmartBid.
            Create your account and select a role to get started.
          </Text>

          <Text style={[styles.label, {color: theme.colors.text}]}>Email:</Text>
          <TextInput
          style={[styles.inputField, {backgroundColor: theme.colors.inputField}]} 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none" 
          placeholder="m@example.com"
          keyboardType= "email-address"
          />

          <Text style={[styles.label, {color: theme.colors.text}]}>Password:</Text>
          <TextInput
          style={[styles.inputField, {backgroundColor: theme.colors.inputField}]} 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          placeholder="password"
          />

          <Text style={styles.roleText}>Please select whether you want to sell or buy products</Text>
          <Text style={[styles.roleIntro, {color: theme.colors.text}]}>I want to...</Text>
          <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[ styles.card, {backgroundColor: theme.colors.card},userType === "buyer" && styles.cardSelected ]}
            onPress={() => setUserType("buyer")}
          >
            <View  style={[styles.Icon, { backgroundColor: theme.colors.iconBackground, borderRadius: 24, padding: 12 }]}>
            <AntDesign name="shoppingcart" size={24} color="#ff7d00" />
            </View>
            <Text style={[styles.cardTitle, {color: theme.colors.text}]}>Buy Products</Text>
            <Text style={[styles.cardText, {color: theme.colors.cardSubTitle}]}>Bid on items and make purchases</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[ styles.card, {backgroundColor: theme.colors.card}, userType === "seller" && styles.cardSelected ]}
            onPress={() => setUserType("seller")}
          >
            <View style={[styles.Icon, { backgroundColor: theme.colors.iconBackground, borderRadius: 24, padding: 12 }]}>
            <Fontisto name="shopping-store" size={24} color="#ff7d00" />
            </View>
            <Text style={[styles.cardTitle, {color: theme.colors.text}]}>Sell Products</Text>
            <Text style={[styles.cardText, {color: theme.colors.cardSubTitle}]}>List items and accept bids</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.conclude}>
            <Text style={[styles.concludeText, {color: theme.colors.cardSubTitle}]}>Already have an account?</Text>
            <TouchableOpacity style={styles.concludeIcon} onPress={() => router.push("/(auth)/login")}>
              <MaterialIcons name="arrow-right-alt" size={40} color="#ff7d00" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
          style={[styles.button, {backgroundColor: theme.colors.primary}]}
          onPress={handleSignup}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[styles.heading, { color: theme.colors.text }]}>Enter Verification Code:</Text>
          <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (otpRefs.current[index] = ref)}
                  style={[styles.otpBox, { backgroundColor: theme.colors.inputField }]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(event) => handleOtpKeyPress(event, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
          </View>
          
          <View style={styles.conclude}>
              <Text style={[styles.concludeText, { color: resendCooldown > 0 ? theme.colors.cardSubTitle : theme.colors.cardSubTitle }]}>Didn't receive a code? {resendCooldown > 0 ? `(${resendCooldown}s)` : ""} </Text>
              <TouchableOpacity style={{alignSelf: "center"}} onPress={handleResendCode} disabled={resendCooldown > 0 || loading}>
                <MaterialIcons name="arrow-right-alt" size={40} color={resendCooldown > 0 ? theme.colors.cardSubTitle : theme.colors.primary} />
              </TouchableOpacity>
            </View>

          {/* <Button title="Verify Email" onPress={handleVerify} /> */}
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleVerify} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Verify Email</Text>}
          </TouchableOpacity>
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
  },
  appName: {
    fontSize: 30,
    fontFamily: "Poppins",
    fontWeight: "bold",
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    textAlign: "center",
    marginBottom: 40
  },
  label:{
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingBottom: 5
  },
  inputField: {
    width: "100%",
    padding: 16,
    borderColor: "#ccc",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
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
    backgroundColor: "#1B4B66",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center", // Ensures content is centered
    alignContent: "center",
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
  cardSelected: { 
    borderColor: "#ff7d00",
    borderWidth: 1,
    
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
    color: "#D1E8FF"
  },
  concludeIcon:{
    alignSelf: "center"
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
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  heading: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginTop: 30,
    marginBottom: 20
    // color: "#fff",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5,
    borderWidth: 1,
    textAlign: "center",
  },
})
