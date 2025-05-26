import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import Toast from "react-native-toast-message";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { registerUser } = useAuth();
  const router = useRouter();
  const handleRegister = async () => {
    if (!email || !password || !username) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Preencha todos os campos',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'As senhas não coincidem.',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    try {
      await registerUser(email, password, username); // só isso já salva no Firestore
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Conta criada com sucesso!',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        swipeable: true,
      });
      router.push("/login");
    } catch (error: any) {
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
          keyboardType="email-address"
          cursorColor="#323232"
        />
        <Text className="text-sm font-bold text-[#323232] mt-8 text-left">
          NOME DE USUÁRIO
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
          value={username}
          onChangeText={setUsername}
          cursorColor="#323232"
        />
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
          cursorColor="#323232"
        />
        <Text className="text-sm font-bold text-[#323232] mt-8 text-left">
          CONFIRME SUA SENHA
        </Text>
        <TextInput
          className="bg-white rounded-[8] px-4 py-4 mt-2 shadow mb-10"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          cursorColor="#323232"
        />

        <StyledButton variant="default" title="REGISTRAR" onPress={handleRegister} />
        <View className="mt-2 flex-row items-center justify-center">
          <Text className="text-xs text-[#323232] font-bold">
            Você já tem uma conta?
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="ml-1 text-xs underline font-black text-[#323232] items-center">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
