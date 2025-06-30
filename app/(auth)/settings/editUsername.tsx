import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // ou de onde vier seu user
import { Keyboard } from "react-native";
import useAuth from "../../../firebase/hooks/useAuth";
import useDocument from "../../../firebase/hooks/useDocument";
import User from "../../../types/User";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../../components/Loading";
import { doc, updateDoc } from "firebase/firestore";
import useFirebase from "../../../firebase/hooks/useFirebase";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";

export default function EditUsername() {
  const { user, isUsernameTaken } = useAuth();
  const { data, loading } = useDocument<User>("users", user?.uid ?? "");
  const { db } = useFirebase();
  const navigation = useNavigation<any>();

  const [newUsername, setNewUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [checking, setChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (data?.username) {
      setNewUsername(data.username);
    }
  }, [data]);

  const currentUsername = data?.username || "";

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
      Keyboard.scheduleLayoutAnimation;
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!currentUsername) return;

    const username = newUsername.trim();
    const changed = username !== currentUsername.trim();
    setHasChanged(changed);

    if (!changed) {
      setIsAvailable(null);
      setErrorMessage(null);
      return;
    }

    if (username.length === 0 || /\s/.test(username)) {
      setIsAvailable(null);
      setErrorMessage(
        "Seu nome de usuário deve ter 20 caracteres ou menos e conter somente letras, números, sublinhados e nenhum espaço"
      );
      return;
    }

    if (username.length < 3) {
      setIsAvailable(null);
      setErrorMessage("O nome de usuário deve ter mais de 3 caracteres");
      return;
    }

    if (username.length > 20) {
      setIsAvailable(null);
      setErrorMessage("Seu nome de usuário deve ter 20 caracteres ou menos");
      return;
    }

    if (!/^[a-zA-Z0-9-_]+$/.test(username)) {
      setIsAvailable(null);
      setErrorMessage("Utilize apenas letras, números, '-' e '_'.");
      return;
    }

    // Checagem no banco
    const checkAvailability = async () => {
      setChecking(true);
      try {
        const taken = await isUsernameTaken(username);
        setIsAvailable(!taken);
        setErrorMessage(
          taken ? "Este nome de usuário já está sendo usado." : null
        );
      } catch {
        setIsAvailable(false);
        setErrorMessage("Erro ao verificar nome de usuário.");
      } finally {
        setChecking(false);
      }
    };
    const timeout = setTimeout(checkAvailability, 600);
    return () => clearTimeout(timeout);
  }, [newUsername, currentUsername]);

  const handleSave = async () => {
    if (!hasChanged || isAvailable === false) return;
    Keyboard.dismiss();

    try {
      const userRef = doc(db!, "users", user?.uid!);
      await updateDoc(userRef, { username: newUsername.trim() });

      Toast.show({
        type: "customSuccess",
        text1: "Nome de usuário atualizado!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      setTimeout(() => {
        navigation.navigate("settings/home");
      }, 3000);
    } catch (error) {
      Toast.show({
        type: "customError",
        text1: "Erro ao atualizar nome de usuário!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
    }
  };

  const showError = errorMessage && !checking;

  if (loading) return <Loading />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // ajuste conforme sua UI
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 p-6">
        <Text className="text-lg font-black mb-1 text-gray-500">ATUAL</Text>
        <TextInput
          value={currentUsername}
          editable={false}
          className="bg-white text-gray-500 font-bold px-4 py-3 rounded-xl mb-6 shadow-sm shadow-black"
        />

        <Text className="text-lg font-black mb-1 text-[#323232]">NOVO</Text>
        <View
          className={`flex-row items-center bg-white rounded-xl px-4 mb-2 shadow-sm shadow-black border ${
            showError ? "border-[#E10000]" : "border-transparent"
          }`}
        >
          <TextInput
            autoFocus
            ref={inputRef}
            value={newUsername}
            onChangeText={setNewUsername}
            className="flex-1 text-base font-bold"
            cursorColor={"#323232"}
          />
          {!showError && isAvailable === true && (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          )}
          {showError && <Ionicons name="alert-circle" size={24} color="red" />}
        </View>

        {showError && (
          <Text className="text-sm text-[#E10000] font-medium mb-4">
            {errorMessage}
          </Text>
        )}

        <View className="flex-1 justify-end mt-auto">
          <TouchableOpacity
            onPress={handleSave}
            disabled={!hasChanged || isAvailable === false}
            className={`py-3 rounded-xl mb-10 ${
              !hasChanged || isAvailable === false
                ? "bg-gray-300"
                : "bg-[#323232]"
            }`}
          >
            <Text className="text-center text-white font-black">SALVAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
