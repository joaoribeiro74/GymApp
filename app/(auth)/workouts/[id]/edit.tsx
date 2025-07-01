import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FlatList, TextInput } from "react-native-gesture-handler";
import SearchInput from "../../../../components/SearchInput";
import AddExerciseCard from "../../../../components/AddExerciseCard";
import useCollection from "../../../../firebase/hooks/useCollection";
import useUserWorkouts from "../../../../hooks/useUserWorkouts";
import { useLocalSearchParams, useNavigation } from "expo-router";
import AddExerciseBar from "../../../../components/ExerciseBar";
import Toast from "react-native-toast-message";
import toastConfig from "../../../../components/CustomToast";
import { Ionicons } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import useAuth from "../../../../firebase/hooks/useAuth";
import useFirebase from "../../../../firebase/hooks/useFirebase";
import * as NavigationBar from "expo-navigation-bar";
import { useTheme } from "../../../../context/ThemeContext";
import EditWorkoutModal from "../../../../components/Modals/EditWorkoutModal";

type Exercise = {
  id: string;
  exercise: string;
  category: string;
};

export default function edit() {
  const [search, setSearch] = useState("");
  const [addedExercises, setAddedExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const { workouts } = useUserWorkouts();
  const { id } = useLocalSearchParams();
  const [saving, setSaving] = useState(false);
  const { isDark } = useTheme();

  const { user } = useAuth();
  const { db } = useFirebase();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const workout = useMemo(
    () => workouts.find((w) => w.id === id),
    [workouts, id]
  );

  useEffect(() => {
    if (workout) {
      setAddedExercises(workout.exercises);
      setWorkoutName(workout.name);
    }
  }, [workout]);

  const { data: exercises, loading } = useCollection("exercises", true) as {
    data: Exercise[];
    loading: boolean;
  };

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#ffffff");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  const clearExercises = useCallback(() => setAddedExercises([]), []);

  const filteredExercises = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = exercises.filter(
      (ex) =>
        ex.exercise.toLowerCase().includes(lowerSearch) ||
        ex.category.toLowerCase().includes(lowerSearch)
    );

    const sorted = filtered.sort((a, b) => {
      const aAdded = addedExercises.some((ex) => ex.id === a.id);
      const bAdded = addedExercises.some((ex) => ex.id === b.id);
      if (aAdded === bAdded) return 0;
      return aAdded ? -1 : 1;
    });

    return sorted;
  }, [exercises, search, addedExercises]);

  const toggleExercise = useCallback(
    (id: string) => {
      setAddedExercises((prev) => {
        if (prev.find((ex) => ex.id === id)) {
          return prev.filter((ex) => ex.id !== id);
        }
        const exercise = exercises.find((ex) => ex.id === id);
        return exercise ? [...prev, exercise] : prev;
      });
    },
    [exercises]
  );

  const handleEditWorkout = useCallback(async () => {
    if (!workoutName.trim()) {
      Toast.show({
        type: "customError",
        text1: "O nome do treino é obrigatório!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    if (addedExercises.length === 0) {
      Toast.show({
        type: "customError",
        text1: "Adicione pelo menos um exercício!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    try {
      setSaving(true);

      const workoutId = Array.isArray(id) ? id[0] : id;

      if (!workoutId) {
        throw new Error("ID do treino não encontrado.");
      }

      const workoutDocRef = doc(
        db!,
        "users",
        user?.uid!,
        "workoutTemplates",
        workoutId
      );

      await updateDoc(workoutDocRef, {
        name: workoutName.trim().toUpperCase(),
        exercises: addedExercises,
      });

      Toast.show({
        type: "customSuccess",
        text1: "Treino atualizado com sucesso!",
        position: "top",
        visibilityTime: 2000,
        autoHide: true,
        swipeable: true,
      });

      setTimeout(() => {
        setModalVisible(false);
        setSaving(false);
        navigation.navigate("workouts/home");
      }, 2000);
    } catch (error) {
      Toast.show({
        type: "customError",
        text1: "Erro ao atualizar treino!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      setSaving(false);
    }
  }, [workoutName, addedExercises, db, user, navigation, id]);

  return (
    <SafeAreaView className="flex-1 dark:bg-gray-900">
      <View className="flex-1 pb-8">
        <View className="px-4">
          <Text className="text-md font-bold text-[#323232] dark:text-white">
            BUSCAR EXERCÍCIOS
          </Text>
          <SearchInput value={search} onChangeText={setSearch} />
        </View>

        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AddExerciseCard
              name={item.exercise.toUpperCase()}
              category={item.category.toUpperCase()}
              added={addedExercises.some((ex) => ex.id === item.id)}
              onToggle={() => toggleExercise(item.id)}
              mode="select"
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 10,
            padding: 16,
          }}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text className="text-center text-md text-[#323232] dark:text-white font-bold mt-4">
              EXERCÍCIO NÃO ENCONTRADO.
            </Text>
          }
        />
      </View>
      <AddExerciseBar
        count={addedExercises.length}
        onPress={() => setModalVisible(true)}
        mode="view"
      />
      <EditWorkoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        addedExercises={addedExercises}
        setAddedExercises={setAddedExercises}
        workoutName={workoutName}
        setWorkoutName={setWorkoutName}
        handleEditWorkout={handleEditWorkout}
      />
    </SafeAreaView>
  );
}
