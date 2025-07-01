import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AddExerciseCard from "../AddExerciseCard";
import AddExerciseBar from "../ExerciseBar";
import toastConfig from "../CustomToast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

type Exercise = {
  id: string;
  exercise: string;
  category: string;
};

type EditModalProps = {
  visible: boolean;
  onClose: () => void;
  addedExercises: Exercise[];
  setAddedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  workoutName: string;
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
  handleEditWorkout: () => void;
};

export default function EditWorkoutModal({
  visible,
  onClose,
  addedExercises,
  setAddedExercises,
  workoutName,
  setWorkoutName,
  handleEditWorkout,
}: EditModalProps) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const clearExercises = useCallback(() => setAddedExercises([]), [setAddedExercises]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
        <SafeAreaView className="flex-1 bg-[#ECEBEB] dark:bg-gray-900 px-4">
          <View className="flex-row items-center justify-between pt-4">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="chevron-down" size={30} color={isDark ? "#ffffff" : "#323232"} />
            </TouchableOpacity>
            <Text className="font-black text-[#323232] dark:text-white">EDITAR EXERCÍCIOS</Text>
            <TouchableOpacity onPress={clearExercises}>
              <Text className="font-bold text-[#E10000] text-sm">Limpar</Text>
            </TouchableOpacity>
          </View>
          <View className="pt-8">
            <Text className="font-bold text-[#323232] dark:text-white">
              EDITAR NOME DO TREINO
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 dark:text-white rounded-[8] py-4 mt-2 shadow-sm shadow-black font-bold px-4"
              value={workoutName}
              onChangeText={setWorkoutName}
              cursorColor={isDark ? "#ffffff" : "#323232"}
            ></TextInput>
          </View>

          <View className="flex-1 pt-12">
            <Text className="font-bold dark:text-white text-[#323232] pb-2">
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
            />
          </View>
          <View className="bottom-0 left-0 right-0 absolute">
            <AddExerciseBar
              count={addedExercises.length}
              mode="edit"
              onPress={handleEditWorkout}
            />
          </View>
        </SafeAreaView>
        <Toast config={toastConfig} />
      </Modal>
  );
}
