import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
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
import { Ionicons } from "@expo/vector-icons";
import Loading from "../../../components/Loading";
import useCollection from "../../../firebase/hooks/useCollection";
import Toast from "react-native-toast-message";
import toastConfig from "../../../components/CustomToast";
import useAuth from "../../../firebase/hooks/useAuth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import useFirebase from "../../../firebase/hooks/useFirebase";
import { useNavigation } from "expo-router";

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
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

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
        if (Array.isArray(data.days)) {
          acc.push(...data.days);
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
        userId: user?.uid,
        name: workoutName.trim().toUpperCase(),
        exercises: addedExercises,
        day: selectedDaysFull,
      });

      Toast.show({
        type: "customSuccess",
        text1: "Treino criado com sucesso!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });

      setTimeout(() => {
        setModalVisible(false);
        setWorkoutName("");
        setAddedExercises([]);
        setSelectedDay([]);
        setSaving(false);
        navigation.navigate("workouts/home");
      }, 3000);
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
  }, [workoutName, selectedDay, addedExercises, db, user, navigation]);

  if (loading) return <Loading />;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 pb-8">
        <View className="px-4">
          <Text className="text-md font-bold text-[#323232]">
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
            <Text className="text-center text-md text-[#323232] font-bold mt-4">
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

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView className="flex-1 bg-[#d9d9d9] px-4">
          <View className="flex-row items-center justify-between pt-4">
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="chevron-down" size={30} color="#323232" />
            </TouchableOpacity>
            <Text className="font-black text-[#323232]">EXERCÍCIOS</Text>
            <TouchableOpacity onPress={clearExercises}>
              <Text className="font-bold text-[#E10000] text-sm">Limpar</Text>
            </TouchableOpacity>
          </View>
          <View className="pt-8 pb-8">
            <Text className="font-bold text-[#323232]">NOME DO TREINO</Text>
            <TextInput
              className="bg-white rounded-[8] py-4 mt-2 shadow font-bold px-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              value={workoutName}
              onChangeText={setWorkoutName}
              cursorColor="#323232"
            ></TextInput>
          </View>
          <View className="pt-6">
            <Text className="font-bold text-[#323232] pb-2">DIA DA SEMANA</Text>
            <View className="flex-row flex-wrap justify-between">
              {Object.entries(weekDays).map(([sigla]) => (
                <TouchableOpacity
                  key={sigla}
                  onPress={() => toggleDaySelection(sigla)}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                  className={`shadow rounded-[8] p-2 ${
                    selectedDay.includes(sigla) ? "bg-[#323232]" : "bg-white"
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      selectedDay.includes(sigla)
                        ? "text-white"
                        : "text-[#323232]"
                    }`}
                  >
                    {sigla}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="flex-1 pt-12">
            <Text className="font-bold text-[#323232] pb-2">
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
              mode="create"
              onPress={() => {
                handleCreateWorkout();
              }}
            />
          </View>
        </SafeAreaView>
        <Toast config={toastConfig} />
      </Modal>
    </SafeAreaView>
  );
}
