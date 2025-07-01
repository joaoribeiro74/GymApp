import {
  View,
  Text,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SearchInput from "../../../components/SearchInput";
import AddExerciseCard from "../../../components/AddExerciseCard";
import * as NavigationBar from "expo-navigation-bar";
import AddExerciseBar from "../../../components/ExerciseBar";
import Loading from "../../../components/Loading";
import useCollection from "../../../firebase/hooks/useCollection";
import Toast from "react-native-toast-message";
import useAuth from "../../../firebase/hooks/useAuth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import useFirebase from "../../../firebase/hooks/useFirebase";
import { router } from "expo-router";
import { useTheme } from "../../../context/ThemeContext";
import CreateWorkoutModal from "../../../components/Modals/CreateWorkoutModal";

type Exercise = {
  id: string;
  exercise: string;
  category: string;
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
export default function create() {
  const [search, setSearch] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [addedExercises, setAddedExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const { user } = useAuth();
  const { db } = useFirebase();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const { data: exercises, loading } = useCollection("exercises", true) as {
    data: Exercise[];
    loading: boolean;
  };

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#ffffff");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  const filteredExercises = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return exercises.filter(
      (ex) =>
        ex.exercise.toLowerCase().includes(lowerSearch) ||
        ex.category.toLowerCase().includes(lowerSearch)
    );
  }, [exercises, search]);
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

  const toggleDaySelection = useCallback((day: string) => {
    setSelectedDay((prev) => {
      if (prev.includes(day)) {
        return [];
      } else {
        return [day];
      }
    });
  }, []);

  const clearExercises = useCallback(() => setAddedExercises([]), []);

  const handleCreateWorkout = useCallback(async () => {
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

    if (selectedDay.length === 0) {
      Toast.show({
        type: "customError",
        text1: "Escolha um dia da semana!",
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
      const workoutTemplatesRef = collection(
        db!,
        "users",
        user?.uid!,
        "workoutTemplates"
      );
      const q = query(workoutTemplatesRef, where("userId", "==", user?.uid));
      const querySnapshot = await getDocs(q);

      const existingDays = querySnapshot.docs.reduce<string[]>((acc, doc) => {
        const data = doc.data();
        if (Array.isArray(data.day)) {
          acc.push(...data.day);
        }
        return acc;
      }, []);

      const selectedDaysFull = selectedDay.map((sigla) => weekDays[sigla]);

      const hasConflict = selectedDaysFull.some((day) =>
        existingDays.includes(day)
      );

      if (hasConflict) {
        Toast.show({
          type: "customError",
          text1: "Já existe um treino para esse dia!",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
          swipeable: true,
        });
        setSaving(false);
        return;
      }
      await addDoc(workoutTemplatesRef, {
        name: workoutName.trim().toUpperCase(),
        exercises: addedExercises,
        day: selectedDaysFull,
      });

      Toast.show({
        type: "customSuccess",
        text1: "Treino criado com sucesso!",
        position: "top",
        visibilityTime: 2000,
        autoHide: true,
        swipeable: true,
      });

      setTimeout(() => {
        setModalVisible(false);
        setWorkoutName("");
        setAddedExercises([]);
        setSelectedDay([]);
        setSaving(false);
        router.push("workouts/home");
      }, 2000);
    } catch (error) {
      Toast.show({
        type: "customError",
        text1: "Erro ao criar treino!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
    }
  }, [workoutName, selectedDay, addedExercises, db, user]);

  if (loading) return <Loading />;

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
      <CreateWorkoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        workoutName={workoutName}
        onChangeWorkoutName={setWorkoutName}
        addedExercises={addedExercises}
        setAddedExercises={setAddedExercises}
        selectedDay={selectedDay}
        toggleDaySelection={toggleDaySelection}
        clearExercises={clearExercises}
        handleCreateWorkout={handleCreateWorkout}
      />
    </SafeAreaView>
  );
}
