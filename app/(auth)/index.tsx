import { View, Text } from "react-native";
import React from "react";
import useNavigationExitOnBack from "../../hooks/useNavigationExitOnBack";
import TodayWorkout from "../../components/TodayWorkout";
import ProgressWeight from "../../components/ProgressWeight";
import { ScrollView } from "react-native-gesture-handler";
import useAuth from "../../firebase/hooks/useAuth";
import useDocument from "../../firebase/hooks/useDocument";
import User from "../../types/User";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function Index() {
  useNavigationExitOnBack();

  const { theme } = useTheme();
  const { user } = useAuth();

  const { data, loading } = useDocument<User>("users", user?.uid ?? "");

  if (loading) return <Loading />;

  return (
    <SafeAreaView className="flex-1 dark:bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-4 dark:bg-gray-900">
          <Text className="text-2xl font-bold text-[#323232] dark:text-white">
            OLÁ{data?.username ? `, ${data.username.toUpperCase()}` : ""}
          </Text>
          <Text className="text-md font-bold text-[#323232] mb-6 dark:text-white">
            O QUE VOCÊ GOSTARIA DE FAZER HOJE?
          </Text>

          <TodayWorkout />

          <Text className="text-4xl font-bold text-[#323232] dark:text-white mt-8 mb-4">
            PROGRESSO
          </Text>

          <ProgressWeight />

          <StyledButton
            variant="custom"
            title="CRIAR TREINO"
            onPress={() => router.push("/(auth)/workouts/create")}
          >
            <Text className="text-white text-center font-bold">
              CRIAR TREINO
            </Text>
            <AntDesign name="pluscircle" size={20} color="white" />
          </StyledButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
