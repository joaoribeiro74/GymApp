// forgotPassword.tsx (exemplo simples)
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useEffect, useRef, useState } from "react";
import useAuth from "../firebase/hooks/useAuth";
import Toast from "react-native-toast-message";
import StyledButton from "../components/StyledButton";
import { useTheme } from "../context/ThemeContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { isDark } = useTheme();
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um email.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert("Sucesso", "Email de recuperação enviado.");

      setTimeLeft(60);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft]);

  return (
    <View className="flex-1 dark:bg-gray-900 p-4">
      <View className="pt-4">
        <Text className="text-sm font-black mb-1 text-[#323232] dark:text-white">
          DIGITE SEU EMAIL PARA REDEFINIR A SENHA:
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          cursorColor={isDark ? "#ffffff" : "#323232"}
          autoCapitalize="none"
          className="bg-white dark:bg-gray-800 dark:text-white text-[#323232] font-bold px-4 py-3 rounded-xl mb-2 shadow-sm shadow-black"
        />

        {timeLeft > 0 && (
          <Text className="text-[#E10000] font-normal text-sm">
            Email enviado! Aguarde {timeLeft} segundos para reenviar.
          </Text>
        )}

        <View className="justify-end">
          <TouchableOpacity
            className="py-3 rounded-xl mt-10 bg-[#323232] dark:bg-gray-800"
            onPress={handleReset}
            disabled={loading || timeLeft > 0}
          >
            <Text className="text-center text-white font-black">
              ENVIAR E-MAIL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
