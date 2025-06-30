import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAuth from "../firebase/hooks/useAuth";
import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import Toast from "react-native-toast-message";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const screenHeight = Dimensions.get("window").height;
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("jvcarvalho09@hotmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/(auth)");
    }
  }, [user]);

  if (loading) return <Loading />;

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/(auth)");
    } catch (error: any) {
      Toast.show({
        type: "customError",
        text1: error.message || "Tente novamente mais tarde",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        swipeable: true,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="bg-[#d9d9d9] flex-1">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View
              className="bg-white dark:bg-black items-center justify-center rounded-b-[30] shadow-md shadow-black"
              style={{
                height: screenHeight * 0.3,
              }}
            >
              <Image
                source={require("../assets/logo.png")}
                className="h-[100] w-[100]"
              />
            </View>

            <View className="m-8 flex-1">
              <Text className="text-sm font-bold text-[#323232] mt-8 text-left">
                E-MAIL
              </Text>
              <TextInput
                className="bg-white rounded-[8] px-4 py-4 mt-2 shadow-sm shadow-black"
                value={email}
                onChangeText={setEmail}
                cursorColor="#323232"
                keyboardType="email-address"
              ></TextInput>
              <Text className="text-sm font-bold text-[#323232] mt-8 text-left">
                SENHA
              </Text>
              <View className="bg-white rounded-[8] mt-2 shadow-sm shadow-black flex-row items-center px-4">
                <TextInput
                  className="flex-1 py-4 pr-2"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  cursorColor="#323232"
                  keyboardType="default"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#323232"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="mb-8">
                <Text className="text-xs font-black text-[#323232] mt-2 text-right underline">
                  ESQUECEU A SENHA?
                </Text>
              </TouchableOpacity>

              <StyledButton
                variant="default"
                title="LOGIN"
                onPress={handleLogin}
              />
              <View className="mt-2 flex-row items-center justify-center">
                <Text className="text-xs text-[#323232] font-bold">
                  Não tem Login?
                </Text>
                <TouchableOpacity onPress={() => router.push("/register")}>
                  <Text className="ml-1 text-xs underline font-black text-[#323232] items-center">
                    Cadastre-se
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
