import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { data } from "../mocks/data";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StyledButton from "./StyledButton";

export default function TodayWorkout() {
  const router = useRouter();

  return (
    <View
      className="bg-white rounded-[10] p-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text className="font-bold text-sm text-[#323232]">PRÓXIMO TREINO</Text>
      {data.map((allWorkout, index) => (
        <Text key={index} className="text-[40px] font-bold text-[#323232] mb-2">
          {allWorkout.workout.toUpperCase()}
        </Text>
      ))}

      <View className="flex-row items-center gap-2 mb-6">
        <FontAwesome name="calendar" size={20} color="#323232" />
        {data.map((allWorkout, index) => (
          <Text key={index} className="text-md font-bold text-[#323232]">
            {allWorkout.day.toUpperCase()}
          </Text>
        ))}
      </View>

      <StyledButton variant="custom"  onPress={() => router.push("/(auth)/workouts/nextWorkout")}>
        <Text className="text-white text-center font-bold">VER TREINO</Text>
      </StyledButton>
    </View>
  );
}
