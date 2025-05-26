import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAuth from "../firebase/hooks/useAuth";
import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import Toast from "react-native-toast-message";

export default function Login() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("joao@example.com");
  const [password, setPassword] = useState("joao1234@");

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
      console.log('Mostrando Toast de erro:', error.message);
        Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: error.message || 'Tente novamente mais tarde',
            position: 'top',
            visibilityTime: 5000,
            autoHide: true,
            swipeable: true,
        });
    }
  };

  return (
    <View className="bg-[#d9d9d9] h-full">
      <View
        className="bg-white h-1/3 items-center justify-center rounded-b-[30] shadow"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          className="h-[100] w-[100]"
        />
      </View>

      <View className="m-8">
        <Text className="text-sm font-bold text-[#323232] mt-8 text-left">
          E-MAIL
        </Text>
        <TextInput
          className="bg-white rounded-[8] px-4 py-4 mt-2 shadow"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <Text className="text-sm font-bold text-[#323232] mt-8 text-left">
          SENHA
        </Text>
        <TextInput
          className="bg-white rounded-[8] px-4 py-4 mt-2 shadow"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity className="mb-8">
          <Text className="text-xs font-black text-[#323232] mt-2 text-right underline">
            ESQUECEU A SENHA?
          </Text>
        </TouchableOpacity>

        <StyledButton variant="default" title="LOGIN" onPress={handleLogin} />
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
    </View>
  );
}
