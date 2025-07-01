import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StyledButton from "./StyledButton";
import useUserWorkouts from "../hooks/useUserWorkouts";
import useNextWorkout from "../hooks/useNextWorkout";
import Loading from "./Loading";
import { useTheme } from "../context/ThemeContext";

export default function TodayWorkout() {
  const router = useRouter();
  const { workouts, workoutLogs, loading } = useUserWorkouts();
  const { isDark } = useTheme();

  const nextWorkout = useNextWorkout(workouts, workoutLogs);

  if (loading) return <Loading />;

  return (
    <View
      className="bg-white dark:bg-gray-800 rounded-[10] p-4 shadow-sm shadow-black"
    >
      <Text className="font-bold text-sm text-[#323232] dark:text-white">PRÓXIMO TREINO</Text>
      {nextWorkout ? (
        <>
          <Text className="text-[40px] font-bold text-[#323232] dark:text-white mb-2">
            {nextWorkout.name.toUpperCase()}
          </Text>

          <View className="flex-row items-center gap-2 mb-6">
            <FontAwesome name="calendar" size={20} color={isDark ? "#ffffff" : "#323232"} />
            <Text className="text-md font-bold text-[#323232] dark:text-white">
              {nextWorkout.day.toUpperCase()}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text className="text-[40px] font-bold text-[#323232] dark:text-white mb-2">
            INDEFINIDO
          </Text>

          <View className="flex-row items-center gap-2 mb-6">
            <FontAwesome name="calendar" size={20} color={isDark ? "#ffffff" : "#323232"} />
            <Text className="text-md font-bold text-[#323232] dark:text-white">—</Text>
          </View>
        </>
      )}

      <StyledButton
        variant="custom"
        onPress={() => router.push("/(auth)/workouts/nextWorkout")}
      >
        <Text className="text-white text-center font-bold">VER TREINO</Text>
      </StyledButton>
    </View>
  );
}
