import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import useFirebase from "../firebase/hooks/useFirebase";
import useAuth from "../firebase/hooks/useAuth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import Toast from "react-native-toast-message";
type Exercise = {
  id: string;
  exercise: string;
  series: string;
  reps: string;
  weight: string;
};

type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
  notes?: string;
};

type Props = {
  workout: Workout;
};
export default function EditExerciseCard({ workout }: Props) {
  const { db } = useFirebase();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [exerciseStates, setExerciseStates] = useState<
    Record<string, { series: string; reps: string[]; weights: string[] }>
  >({});
  const [generalNote, setGeneralNote] = useState(workout.notes || "");

  useEffect(() => {
    const initialStates: typeof exerciseStates = {};
    workout.exercises.forEach((ex) => {
      const numSeries = parseInt(ex.series) || 0;
      initialStates[ex.id] = {
        series: ex.series,
        reps: Array(numSeries).fill(""),
        weights: Array(numSeries).fill(""),
      };
    });
    setExerciseStates(initialStates);
  }, [workout]);

  const handleSeriesChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setExerciseStates((prev) => ({
      ...prev,
      [id]: {
        series: value,
        reps: Array(num).fill(""),
        weights: Array(num).fill(""),
      },
    }));
  };

  const handleRepsChange = (id: string, index: number, value: string) => {
    setExerciseStates((prev) => {
      const updated = [...prev[id].reps];
      updated[index] = value;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          reps: updated,
        },
      };
    });
  };

  const handleWeightChange = (id: string, index: number, value: string) => {
    setExerciseStates((prev) => {
      const updated = [...prev[id].weights];
      updated[index] = value;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          weights: updated,
        },
      };
    });
  };

  const handleDeleteWorkout = () => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esse treino?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            if (!user || !db) return;

            await deleteDoc(
              doc(db, "users", user.uid, "workoutTemplates", workout.id)
            );
            Toast.show({
              type: "customSuccess",
              text1: "Treino excluído com sucesso!",
              position: "top",
              visibilityTime: 3000,
              autoHide: true,
              swipeable: true,
            });
          } catch (error) {
            Toast.show({
              type: "customError",
              text1: "Erro ao excluir treino!",
              position: "top",
              visibilityTime: 3000,
              autoHide: true,
              swipeable: true,
            });
          }
        },
      },
    ]);
  };

  const handleSave = async () => {
    if (!user || !db) return;

    const hasEmptyFields = Object.values(exerciseStates).some((state) => {
      return (
        !state.series ||
        state.reps.some((r) => r.trim() === "") ||
        state.weights.some((w) => w.trim() === "")
      );
    });

    if (hasEmptyFields) {
      Toast.show({
        type: "customError",
        text1: "Preencha todas as séries, repetições e pesos!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    try {
      const logData = {
        workoutId: workout.id,
        name: workout.name,
        date: new Date(),
        notes: generalNote || "",
        exercises: workout.exercises.map((ex) => {
          const state = exerciseStates[ex.id];
          return {
            exerciseId: ex.id,
            exercise: ex.exercise,
            series: parseInt(state.series),
            reps: state.reps,
            weights: state.weights,
          };
        }),
      };

      await addDoc(collection(db, "users", user.uid, "workoutLogs"), logData);

      Toast.show({
        type: "customSuccess",
        text1: "Treino salvo no histórico!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });

      const clearedStates: typeof exerciseStates = {};
      workout.exercises.forEach((ex) => {
        const numSeries = parseInt(ex.series) || 0;
        clearedStates[ex.id] = {
          series: ex.series,
          reps: Array(numSeries).fill(""),
          weights: Array(numSeries).fill(""),
        };
      });

      setExerciseStates(clearedStates);
      setGeneralNote("");
      setExpanded(false);
    } catch (err) {
      Toast.show({
        type: "customError",
        text1: "Erro ao salvar o treino!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
    }
  };

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
        <View className="flex-row items-center">
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
            {!expanded && (
              <Text className="text-md font-bold text-[#323232]">
                {workout.exercises.length} EXERCÍCIOS
              </Text>
            )}
          </View>
        </View>
        <View className="justify-end">
          <TouchableOpacity onPress={handleDeleteWorkout} className="ml-4">
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
            onPress={handleSave}
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
