import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Workout } from "../hooks/useUserWorkouts";
import { useExerciseStates } from "../hooks/useExerciseStates";
import { useSaveWorkout } from "../hooks/useSaveWorkout";
import { useDeleteWorkout } from "../hooks/useDeleteWorkout";

type Props = {
  workout: Workout;
  defaultExpanded?: boolean;
};
export default function EditExerciseCard({ workout, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { exerciseStates, handleSeriesChange, handleRepsChange, handleWeightChange, setExerciseStates } = useExerciseStates(workout);
  const [generalNote, setGeneralNote] = useState(workout.notes || "");
  const { handleSave, loading } = useSaveWorkout(workout, exerciseStates, setExerciseStates, generalNote, setGeneralNote, setExpanded);
  const { handleDeleteWorkout } = useDeleteWorkout();

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
              name={expanded ? "chevron-up" : "create"}
              size={30}
              color="#323232"
            />
          </TouchableOpacity>
          <View className="flex-col">
            <Text className="text-2xl font-black text-black">
              {workout.name}
            </Text>

            <Text className="text-md font-bold text-[#323232]">{workout.day}</Text>
            {!expanded && (
              <Text className="text-sm font-bold text-[#323232]">
                {workout.exercises.length} EXERCÍCIOS
              </Text>
            )}
          </View>
        </View>
        <View className="justify-end">
          <TouchableOpacity onPress={() => handleDeleteWorkout(workout.id)} className="ml-4">
            <Ionicons name="trash" size={28} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      {expanded &&
        workout.exercises?.map((exercise) => {
          const state = exerciseStates[exercise.id];
          if (!state) return null;

          return (
            <View key={exercise.id} className="p-2 bg-white rounded mb-2">
              <Text className="text-[#323232] text-lg font-bold pb-2">
                {exercise.exercise.toUpperCase()}
              </Text>

              <Text className="font-black text-xs text-[#323232]">SÉRIES</Text>
              <TextInput
                value={state.series}
                onChangeText={(text) => handleSeriesChange(exercise.id, text)}
                keyboardType="numeric"
                cursorColor="#323232"
                className="bg-[#EDEDED] rounded-[8] py-2 mb-4 shadow px-4 text-[#323232] font-black w-[20%]"
              />

              {Array.from({ length: parseInt(state.series) || 0 }).map(
                (_, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between w-[100%] mb-4"
                  >
                    <View className="flex-1 mr-4">
                      <Text className="text-xs text-[#323232] font-black">
                        REPETIÇÕES - SÉRIE {index + 1}
                      </Text>
                      <TextInput
                        value={state.reps[index]}
                        onChangeText={(text) =>
                          handleRepsChange(exercise.id, index, text)
                        }
                        keyboardType="numeric"
                        cursorColor="#323232"
                        className="bg-[#EDEDED] rounded-[8] py-2 px-4 shadow text-[#323232] font-black"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs text-[#323232] font-black">
                        PESO - SÉRIE {index + 1}
                      </Text>
                      <TextInput
                        value={state.weights[index]}
                        onChangeText={(text) =>
                          handleWeightChange(exercise.id, index, text)
                        }
                        keyboardType="numeric"
                        cursorColor="#323232"
                        className="bg-[#EDEDED] rounded-[8] py-2 px-4 shadow text-[#323232] font-black"
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
          <Text className="font-black text-sm text-[#323232] mb-1">
            ANOTAÇÕES (opcional)
          </Text>
          <TextInput
            value={generalNote}
            onChangeText={setGeneralNote}
            multiline
            maxLength={150}
            cursorColor="#323232"
            className="bg-[#EDEDED] rounded-[8] py-2 mb-4 shadow px-4 text-[#323232] font-bold"
          />

          <TouchableOpacity
            onPress={() => handleSave()}
            className="bg-[#323232] rounded-[8] py-3 items-center"
          >
            <Text className="text-white font-black text-md">
              Salvar alterações
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
