import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Workout } from "../hooks/useUserWorkouts";
import { useExerciseStates } from "../hooks/useExerciseStates";
import { useSaveWorkout } from "../hooks/useSaveWorkout";
import { useDeleteWorkout } from "../hooks/useDeleteWorkout";
import { useTheme } from "../context/ThemeContext";

type Props = {
  workout: Workout;
  defaultExpanded?: boolean;
};
export default function EditExerciseCard({
  workout,
  defaultExpanded = false,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const {
    exerciseStates,
    handleSeriesChange,
    handleRepsChange,
    handleWeightChange,
    setExerciseStates,
  } = useExerciseStates(workout);
  const [generalNote, setGeneralNote] = useState(workout.notes || "");
  const { handleSave, loading } = useSaveWorkout(
    workout,
    exerciseStates,
    setExerciseStates,
    generalNote,
    setGeneralNote,
    setExpanded
  );
  const { handleDeleteWorkout } = useDeleteWorkout();
  const { isDark } = useTheme();

  return (
    <View
      className="bg-white dark:bg-gray-800 rounded-[10] flex p-2 mb-2 min-h-[80px] shadow-sm shadow-black"
    >
      <View className="p-2 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            className="pr-4"
            onPress={() => setExpanded((prev) => !prev)}
          >
            <Ionicons
              name={expanded ? "chevron-up" : "create"}
              size={30}
              color={isDark ? "#ffffff" : "#323232"}
            />
          </TouchableOpacity>
          <View className="flex-col">
            <Text className="text-2xl font-black text-black dark:text-white">
              {workout.name}
            </Text>

            <Text className="text-md font-bold text-[#323232] dark:text-gray-400">
              {workout.day}
            </Text>
            {!expanded && (
              <Text className="text-sm font-bold text-[#323232] dark:text-gray-400">
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

      {expanded &&
        workout.exercises?.map((exercise) => {
          const state = exerciseStates[exercise.id];
          if (!state) return null;

          return (
            <View key={exercise.id} className="p-2 rounded mb-2">
              <Text className="text-[#323232] dark:text-white text-lg font-bold pb-2">
                {exercise.exercise.toUpperCase()}
              </Text>

              <Text className="font-black text-xs text-[#323232] dark:text-white">SÉRIES</Text>
              <TextInput
                value={state.series}
                onChangeText={(text) => handleSeriesChange(exercise.id, text)}
                keyboardType="numeric"
                cursorColor={isDark ? "#ffffff" : "#323232"}
                className="bg-[#f6f6f6] dark:bg-gray-700 dark:text-white rounded-[8] py-2 mb-4 shadow-sm shadow-black px-4 text-[#323232] font-black w-[20%]"
              />

              {Array.from({ length: parseInt(state.series) || 0 }).map(
                (_, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between w-[100%] mb-4"
                  >
                    <View className="flex-1 mr-4">
                      <Text className="text-xs text-[#323232] dark:text-white font-black">
                        REPETIÇÕES - SÉRIE {index + 1}
                      </Text>
                      <TextInput
                        value={state.reps[index]}
                        onChangeText={(text) =>
                          handleRepsChange(exercise.id, index, text)
                        }
                        keyboardType="numeric"
                        cursorColor={isDark ? "#ffffff" : "#323232"}
                        className="bg-[#f6f6f6] dark:bg-gray-700 dark:text-white rounded-[8] py-2 px-4 shadow-sm shadow-black text-[#323232] font-black"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs text-[#323232] dark:text-white font-black">
                        PESO - SÉRIE {index + 1}
                      </Text>
                      <TextInput
                        value={state.weights[index]}
                        onChangeText={(text) =>
                          handleWeightChange(exercise.id, index, text)
                        }
                        keyboardType="numeric"
                        cursorColor={isDark ? "#ffffff" : "#323232"}
                        className="bg-[#f6f6f6] dark:bg-gray-700 dark:text-white rounded-[8] py-2 px-4 shadow-sm shadow-black text-[#323232] font-black"
                      />
                    </View>
                  </View>
                )
              )}
            </View>
          );
        })}
      {expanded && (
        <View className="p-2">
          <Text className="font-black text-sm text-[#323232] dark:text-white mb-1">
            ANOTAÇÕES (opcional)
          </Text>
          <TextInput
            value={generalNote}
            onChangeText={setGeneralNote}
            multiline
            maxLength={150}
            cursorColor={isDark ? "#ffffff" : "#323232"}
            className="bg-[#f6f6f6] dark:bg-gray-700 dark:text-white rounded-[8] py-2 mb-4 shadow-sm shadow-black px-4 text-[#323232] font-bold"
          />

          <TouchableOpacity
            onPress={() => handleSave()}
            className="bg-[#323232] dark:bg-gray-900 rounded-[8] py-3 items-center"
          >
            <Text className="text-white font-black text-md">
              SALVAR TREINO
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
