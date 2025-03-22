import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {MaterialIcons} from '@expo/vector-icons';
import { useSignIn, } from "@clerk/clerk-expo";


export default function Signin() {

    const router = useRouter()
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")


    const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
    
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

    return(
        <View style={styles.container}>
            <ExpoStatusBar style="dark" />
            
            <TouchableOpacity style={styles.backIcon} onPress={() => router.push("/(auth)/signup")}>
                <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.heading}>Welcome Back</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
            style={styles.textField}
            placeholder="m@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
            style={styles.textField}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />

            <View style={styles.forget}>
                <Text style={styles.forgetText}>Forgot your password?</Text>
                <TouchableOpacity 
                    style={styles.forgetIcon}
                    onPress={() => router.push("/(auth)/forgot-password")} 
                >
                    <MaterialIcons name="arrow-right-alt" size={40} color="#4579EE" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

        </View>  
    )
   
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 16,  
        backgroundColor: "#fff"
    },
    backIcon:{
        marginTop: 20,
        alignSelf: "flex-start",
        marginBottom: 24,
        backgroundColor: "#ddd",
        paddingHorizontal: 10,
        paddingVertical:10,
        borderRadius: 12
    },
    heading:{
        alignSelf: "center",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Poppins",
        marginBottom: 60,
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Poppins",
        color: "#333",
        paddingBottom: 5
    },
    textField: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        backgroundColor: "#fafaff"
    },
    forget:{
        flexDirection: "row",
        gap: 12,
        alignSelf: "flex-end",
        alignItems: "center",
        marginBottom: 30
    },
    forgetText:{
        fontFamily: "Poppins",
        fontSize: 16,
        color: "#666"
    },
    forgetIcon:{
        alignSelf: "flex-end"
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
        fontFamily: "Poppins",
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
})