import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { data } from "../mocks/data";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StyledButton from "./StyledButton";
import useUserWorkouts from "../hooks/useUserWorkouts";
import useNextWorkout from "../hooks/useNextWorkout";
import Loading from "./Loading";

export default function TodayWorkout() {
  const router = useRouter();
  const { workouts, workoutLogs,loading } = useUserWorkouts();

  const nextWorkout = useNextWorkout(workouts, workoutLogs);

  if (loading) return <Loading />;

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
      {nextWorkout ? (
        <>
          <Text className="text-[40px] font-bold text-[#323232] mb-2">
            {nextWorkout.name.toUpperCase()}
          </Text>

          <View className="flex-row items-center gap-2 mb-6">
            <FontAwesome name="calendar" size={20} color="#323232" />
            <Text className="text-md font-bold text-[#323232]">
              {nextWorkout.day.toUpperCase()}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text className="text-[40px] font-bold text-[#323232] mb-2">
            INDEFINIDO
          </Text>

          <View className="flex-row items-center gap-2 mb-6">
            <FontAwesome name="calendar" size={20} color="#323232" />
            <Text className="text-md font-bold text-[#323232]">—</Text>
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
