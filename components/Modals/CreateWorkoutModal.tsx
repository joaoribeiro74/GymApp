import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AddExerciseBar from "../ExerciseBar";
import Toast from "react-native-toast-message";
import toastConfig from "../CustomToast";
import AddExerciseCard from "../AddExerciseCard";

type Exercise = {
  id: string;
  exercise: string;
  category: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  workoutName: string;
  onChangeWorkoutName: (name: string) => void;
  addedExercises: Exercise[];
  selectedDay: string[];
  toggleDaySelection: (day: string) => void;
  clearExercises: () => void;
  handleCreateWorkout: () => void;
  setAddedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

const weekDays: Record<string, string> = {
  DOM: "DOMINGO",
  SEG: "SEGUNDA-FEIRA",
  TER: "TERÇA-FEIRA",
  QUA: "QUARTA-FEIRA",
  QUI: "QUINTA-FEIRA",
  SEX: "SEXTA-FEIRA",
  SAB: "SÁBADO",
};

export default function CreateWorkoutModal({
  visible,
  onClose,
  workoutName,
  onChangeWorkoutName,
  addedExercises,
  selectedDay,
  toggleDaySelection,
  clearExercises,
  handleCreateWorkout,
  setAddedExercises,
}: Props) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-[#ECEBEB] dark:bg-gray-900 px-4">
        <View className="flex-row items-center justify-between pt-4">
          <TouchableOpacity onPress={onClose}>
            <Ionicons
              name="chevron-down"
              size={30}
              color={isDark ? "#ffffff" : "#323232"}
            />
          </TouchableOpacity>
          <Text className="font-black text-[#323232] dark:text-white">
            EXERCÍCIOS
          </Text>
          <TouchableOpacity onPress={clearExercises}>
            <Text className="font-bold text-[#E10000] text-sm">Limpar</Text>
          </TouchableOpacity>
        </View>

        <View className="pt-6 pb-2">
          <Text className="font-bold text-[#323232] dark:text-white">
            NOME DO TREINO
          </Text>
          <TextInput
            className="bg-white dark:bg-gray-800 dark:text-white rounded-[8] py-4 mt-2 shadow-sm shadow-black font-bold px-4"
            value={workoutName}
            onChangeText={onChangeWorkoutName}
            cursorColor={isDark ? "#ffffff" : "#323232"}
          />
        </View>

        <View className="pt-2 pb-2">
          <Text className="font-bold text-[#323232] dark:text-white pb-2">
            DIA DA SEMANA
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {Object.entries(weekDays).map(([sigla]) => (
              <TouchableOpacity
                key={sigla}
                onPress={() => toggleDaySelection(sigla)}
                className={`shadow-sm shadow-black rounded-[6] p-2 ${
                  selectedDay.includes(sigla)
                    ? "bg-[#323232] dark:bg-white"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <Text
                  className={`font-bold ${
                    selectedDay.includes(sigla)
                      ? "text-white dark:text-gray-800"
                      : "text-[#323232] dark:text-white"
                  }`}
                >
                  {sigla}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex-1 pt-4 pb-4">
          <Text className="font-bold text-[#323232] dark:text-white pb-2">
            ORDEM DOS EXERCÍCIOS
          </Text>
          <FlatList
            data={addedExercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AddExerciseCard
                name={item.exercise.toUpperCase()}
                category={item.category.toUpperCase()}
                mode="edit"
                onDelete={() =>
                  setAddedExercises((prev) =>
                    prev.filter((ex) => ex.id !== item.id)
                  )
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
            keyboardShouldPersistTaps="handled"
          />
        </View>

        <View className="bottom-0 left-0 right-0 absolute">
          <AddExerciseBar
            count={addedExercises.length}
            mode="create"
            onPress={handleCreateWorkout}
          />
        </View>
      </SafeAreaView>
      <Toast config={toastConfig} />
    </Modal>
  );
}
