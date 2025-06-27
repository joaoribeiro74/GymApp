import { View, Text } from "react-native";
import React from "react";
import { WorkoutLog } from "../hooks/useUserWorkouts";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  log: WorkoutLog;
};

export default function WorkoutHistoryCard({ log }: Props) {
  const formattedDate = new Date(log.date).toLocaleDateString("pt-BR");

  return (
    <View className="bg-white p-4 mb-3 rounded-xl shadow">
      <Text className="text-lg text-black font-black">{log.name}</Text>
      <View className="flex-row items-center gap-2">
        <FontAwesome name="calendar" size={20} color="#323232" />
        <Text className="text-[#323232] font-bold">{formattedDate}</Text>
      </View>
      <Text className="text-gray-600">
        🔢 {log.exercises.length} exercícios
      </Text>
    </View>
  );
}
