import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { WorkoutLog } from "../hooks/useUserWorkouts";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../context/ThemeContext";

type Props = {
  log: WorkoutLog;
};

export default function WorkoutHistoryCard({ log }: Props) {
  const formattedDate = new Date(log.date).toLocaleDateString("pt-BR");
  const { isDark } = useTheme();

  return (
    <View className="bg-white dark:bg-gray-800 p-3 mb-2 px-4 rounded-xl shadow-sm shadow-black flex-row justify-between items-center">
      <View>
        <Text className="font-black text-sm dark:text-white">{log.name}</Text>
          <Text className="text-xs font-bold text-[#323232] dark:text-gray-200">
            {log.exercises.length} EXERCÍCIOS
          </Text>
          <Text className="text-[#323232] font-light text-sm dark:text-gray-100">
            {formattedDate}
          </Text>
      </View>
      <TouchableOpacity onPress={() => router.push(`/activity/${log.id}/workoutDetails`)}>
        <Ionicons name="eye" size={30} color={isDark ? "#ffffff" : "#323232"} />
      </TouchableOpacity>
    </View>
  );
}
