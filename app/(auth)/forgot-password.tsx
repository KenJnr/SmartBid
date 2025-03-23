import { Text,View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTheme } from "@/src/context/ThemeContext";

export default function Forgetpassword(){
    const {theme} = useTheme()

    const router = useRouter()
    const [email, setEmail] = useState("")
    return(
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <ExpoStatusBar style={theme.mode === "dark" ? "auto" : "dark" } />

            <TouchableOpacity style={[styles.backIcon, {backgroundColor: theme.colors.backIcon}]} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            
            <Text style={[styles.heading, {color: theme.colors.text}]}>Forget password</Text>

            <Text style={[styles.intro, {color: theme.colors.cardSubTitle}]}>Please, enter your email address. You will receive a link 
            to create a new password via email.
            </Text>

            <Text style={[styles.label, {color: theme.colors.text}]}>Email</Text>
            <TextInput
                style={[styles.textField, {backgroundColor: theme.colors.inputField}]}
                placeholder="m@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={[styles.button, {backgroundColor: theme.colors.primary}]}
                onPress={() => router.push("/(auth)/login")}
            >
                <Text style={styles.buttonText}>SEND</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 16,  
    },
    backIcon:{
        marginTop: 20,
        alignSelf: "flex-start",
        marginBottom: 24,
        paddingHorizontal: 10,
        paddingVertical:10,
        borderRadius: 12
    },
    heading:{
        alignSelf: "flex-start",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Poppins",
        marginBottom: 100,
    },
    intro:{
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 20
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 5
    },
    textField: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 60,
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
})