import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useRouter } from "expo-router";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#d9d9d9");

    const checkFirstLaunchAndAuth = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");

      if (user) {
        router.replace("/(auth)");
      } else if (hasLaunched) {
        router.replace("/login");
      } else {
        await AsyncStorage.setItem("hasLaunched", "true");
        setLoading(false);
      }
    };

    checkFirstLaunchAndAuth();
  }, [user]);

  if (loading) return null;

  return (
    <View className="bg-[#d9d9d9] h-full">
      <View
        className="bg-white h-1/2 items-center justify-center rounded-b-[50] shadow-sm shadow-black"
      >
        <Image source={require("../assets/logo.png")} className="" />
      </View>
      <View className="items-center justify-center mt-12 px-8">
        <Text className="text-2xl font-bold text-[#323232] text-center mb-8">
          TENHA CONTROLE SOBRE SEU TREINO
        </Text>
        <Text className="text-sm font-bold text-[#323232] text-center mb-8">
          Gerencie seus treinos, acompanhe sua evolução e mantenha a motivação.
          Crie treinos personalizados e visualize seu progresso de forma simples
          e prática.
        </Text>
      </View>
      <StyledButton
        variant="default"
        title="COMECE AGORA"
        onPress={() => router.push("/login")}
      />
    </View>
  );
}
