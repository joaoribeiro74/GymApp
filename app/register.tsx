import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isDark } = useTheme();

  const { registerUser } = useAuth();
  const router = useRouter();
  const handleRegister = async () => {
    if (!email || !password || !username) {
      Toast.show({
        type: "customError",
        text1: "Preencha todos os campos",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "customError",
        text1: "As senhas não coincidem.",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    try {
      await registerUser(email, password, username); // só isso já salva no Firestore
      Toast.show({
        type: "customSuccess",
        text1: "Conta criada com sucesso!",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        swipeable: true,
      });
      router.push("/login");
    } catch (error: any) {
      Toast.show({
        type: "customError",
        text2: error.message || "Tente novamente mais tarde",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        swipeable: true,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="bg-[#d9d9d9] dark:bg-gray-900 flex-1">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View className="m-8">
              <Text className="text-sm font-bold text-[#323232] dark:text-white mt-8 text-left">
                E-MAIL
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-800 dark:text-white rounded-[8] px-4 py-4 mt-2 shadow-sm shadow-black"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                cursorColor={isDark ? "#ffffff" : "#323232"}
                autoCapitalize="none"
              />
              <Text className="text-sm font-bold text-[#323232] dark:text-white mt-8 text-left">
                NOME DE USUÁRIO
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-800 dark:text-white rounded-[8] px-4 py-4 mt-2 shadow-sm shadow-black"
                value={username}
                onChangeText={setUsername}
                cursorColor={isDark ? "#ffffff" : "#323232"}
                keyboardType="default"
                autoCapitalize="none"
              />
              <Text className="text-sm font-bold text-[#323232] dark:text-white mt-8 text-left">
                SENHA
              </Text>
              <View
                className="bg-white dark:bg-gray-800 dark:text-white rounded-[8] mt-2 shadow-sm shadow-black flex-row items-center px-4"
              >
                <TextInput
                  className="flex-1 py-4"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  cursorColor={isDark ? "#ffffff" : "#323232"}
                  keyboardType="default"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color={isDark ? "#ffffff" : "#323232"}
                  />
                </TouchableOpacity>
              </View>
              <Text className="text-sm font-bold text-[#323232] dark:text-white mt-8 text-left">
                CONFIRME SUA SENHA
              </Text>
              <View
                className="bg-white dark:bg-gray-800 dark:text-white rounded-[8] mt-2 shadow-sm shadow-black flex-row items-center px-4 mb-10"
              >
                <TextInput
                  className="flex-1 py-4"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  cursorColor={isDark ? "#ffffff" : "#323232"}
                  keyboardType="default"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={20}
                    color={isDark ? "#ffffff" : "#323232"}
                  />
                </TouchableOpacity>
              </View>
              <StyledButton
                variant="default"
                title="REGISTRAR"
                onPress={handleRegister}
              />
              <View className="mt-2 flex-row items-center justify-center">
                <Text className="text-xs text-[#323232] dark:text-white font-bold">
                  Você já tem uma conta?
                </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text className="ml-1 text-xs dark:text-white underline font-black text-[#323232] items-center">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
