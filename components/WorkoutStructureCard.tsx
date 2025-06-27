import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Workout } from "../hooks/useUserWorkouts";
import { useDeleteWorkout } from "../hooks/useDeleteWorkout";
import { useNavigation, useRouter } from "expo-router";

type Props = {
  workout: Workout;
  defaultExpanded?: boolean;
  onSwapExercise?: (exerciseId: string) => void;
  onPress?: () => void;
};
export default function WorkoutStructureCard({
  workout,
  defaultExpanded = false,
  onPress,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { handleDeleteWorkout, loading } = useDeleteWorkout();
  const router = useRouter();

  return (
    <View
      className="bg-white rounded-[10] flex p-2 mb-2 min-h-[80px]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View className="p-2 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            className="pr-4"
            onPress={() => setExpanded((prev) => !prev)}
          >
            <Ionicons
              name={expanded ? "chevron-down" : "create"}
              size={30}
              color="#323232"
            />
          </TouchableOpacity>
          <View className="flex-col">
            <Text className="text-2xl font-black text-black">
              {workout.name}
            </Text>

            <Text className="text-md font-bold text-[#323232]">
              {workout.day}
            </Text>
            {!expanded && (
              <Text className="text-sm font-bold text-[#323232]">
                {workout.exercises.length} EXERCÍCIOS
              </Text>
            )}
          </View>
        </View>
        <View className="justify-end">
          <TouchableOpacity
            onPress={() => handleDeleteWorkout(workout.id)}
            className="ml-4"
          >
            <Ionicons name="trash" size={28} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      {expanded && (
        <View className="pt-2">
          {workout.exercises?.map((exercise) => (
            <View key={exercise.id} className="p-2 bg-white rounded mb-2">
              <Text className="text-[#323232] text-lg font-black">
                {exercise.exercise.toUpperCase()}
              </Text>
              <Text className="text-gray-500 text-sm font-bold">
                {exercise.category.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      )}
      {expanded && (
        <View className="p-2">
          <TouchableOpacity
            onPress={() => router.push(`/workouts/${workout.id}/edit`)}
            className="bg-[#323232] rounded-[8] py-3 items-center"
          >
            <Text className="text-white font-black text-md">EDITAR TREINO</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
