import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import useAuth from "../../../firebase/hooks/useAuth";

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um email.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert("Sucesso", "Email de recuperação enviado.");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-4">
      <View className="pt-4">
        <Text className="text-sm font-black mb-1 text-[#323232]">
          DIGITE SEU EMAIL PARA REDEFINIR A SENHA:
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          cursorColor="#323232"
          autoCapitalize="none"
          className="bg-white text-[#323232] font-bold px-4 py-3 rounded-xl mb-6 shadow-sm shadow-black"
        />
        <View className="justify-end">
          <TouchableOpacity
            className="py-3 rounded-xl mb-10 bg-[#323232]"
            onPress={handleReset}
            disabled={loading}
          >
            <Text className="text-center text-white font-black">ENVIAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
