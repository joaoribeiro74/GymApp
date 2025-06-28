import { View, Text } from "react-native";
import React from "react";
import { WorkoutLog } from "../hooks/useUserWorkouts";

type Props = {
  workoutLog: WorkoutLog;
  defaultExpanded?: boolean;
};

type RouteParams = {
  id: string;
};

export default function ViewExerciseCard({
  workoutLog,
  defaultExpanded = false,
}: Props) {
  const formattedDate = new Date(workoutLog.date).toLocaleDateString("pt-BR");
  return (
    <View className="bg-white rounded-[10] flex p-2 mb-2 shadow-sm shadow-black">
      <View className="p-2">
        <Text className="text-2xl font-black text-black">
          {workoutLog.name} -{" "}
          {new Date(workoutLog.date).toLocaleDateString("pt-BR")}
        </Text>
        <Text className="text-sm font-bold text-[#323232]">
          {workoutLog.exercises.length} EXERCÍCIOS
        </Text>
      </View>

      {defaultExpanded &&
        workoutLog.exercises.map((exercise) => (
          <View key={exercise.exercise} className="p-2 bg-white rounded mb-2">
            <Text className="text-[#323232] text-lg font-bold pb-2">
              {exercise.exercise.toUpperCase()}
            </Text>

            {exercise.reps.map((rep, index) => (
              <View
                key={index}
                className="flex-row justify-between w-[100%] mb-3"
              >
                <View className="flex-1 mr-4">
                  <Text className="text-xs text-[#323232] font-black pb-1">
                    REPETIÇÕES - SÉRIE {index + 1}
                  </Text>
                  <Text className="bg-[#f6f6f6] rounded-[8] py-2 px-4 text-[#323232] font-black shadow-sm shadow-black">
                    {rep}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-[#323232] font-black pb-1">
                    PESO - SÉRIE {index + 1}
                  </Text>
                  <Text className="bg-[#f6f6f6] rounded-[8] py-2 px-4 text-[#323232] font-black shadow-sm shadow-black">
                    {exercise.weights[index]} kg
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}

      {defaultExpanded && !!workoutLog.notes && workoutLog.notes.length > 0 && (
        <View className="p-2">
          <Text className="font-black text-xs text-[#323232] mb-1">
            ANOTAÇÕES
          </Text>
          <Text className="bg-[#f6f6f6] rounded-[8] py-2 px-4 text-[#323232] font-bold shadow-sm shadow-black">
            {workoutLog.notes}
          </Text>
        </View>
      )}
    </View>
  );
}
