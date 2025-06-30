import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { WorkoutLog } from "../hooks/useUserWorkouts";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
  log: WorkoutLog;
};

export default function WorkoutHistoryCard({ log }: Props) {
  const formattedDate = new Date(log.date).toLocaleDateString("pt-BR");

  return (
    <View className="bg-white p-3 mb-2 px-4 rounded-xl shadow-sm shadow-black flex-row justify-between items-center">
      <View>
        <Text className="font-black text-sm">{log.name}</Text>
          <Text className="text-xs font-bold text-[#323232]">
            {log.exercises.length} EXERCÍCIOS
          </Text>
          <Text className="text-[#323232] font-light text-sm">
            {formattedDate}
          </Text>
      </View>
      <TouchableOpacity onPress={() => router.push(`/activity/${log.id}/workoutDetails`)}>
        <Ionicons name="eye" size={30} color="#323232" />
      </TouchableOpacity>
    </View>
  );
}
