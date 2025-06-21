import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SearchInput from "../../../components/SearchInput";
import AddExerciseCard from "../../../components/AddExerciseCard";
import * as NavigationBar from "expo-navigation-bar";
import { exercises } from "../../../mocks/data";
import AddExerciseBar from "../../../components/AddExerciseBar";
import { Ionicons } from "@expo/vector-icons";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

export default function create() {
  const [search, setSearch] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [addedExercises, setAddedExercises] = useState<typeof exercises>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredExercises = exercises.filter(
    (ex) =>
      ex.exercise.toLowerCase().includes(search.toLowerCase()) ||
      ex.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#ffffff");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  const insets = useSafeAreaInsets();

  function toggleExercise(id: number) {
    const ex = exercises.find((e) => e.id === id);
    if (!ex) return;

    setAddedExercises((prev) => {
      const exists = prev.find((e) => e.id === id);
      if (exists) {
        return prev.filter((e) => e.id !== id);
      } else {
        return [...prev, ex];
      }
    });
  }

  function clearExercises() {
    setAddedExercises([]);
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4 pb-8">
        <Text className="text-md font-bold text-[#323232]">
          BUSCAR EXERCÍCIOS
        </Text>
        <SearchInput value={search} onChangeText={setSearch} />

        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id.toString()}
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
          contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
        />
      </View>
      <AddExerciseBar
        count={addedExercises.length}
        onPress={() => setModalVisible(true)}
        mode="view"
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
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
          <View className="pt-8">
            <Text className="font-bold text-[#323232]">NOME DO TREINO</Text>
            <TextInput
              className="bg-white rounded-[8] px-4 py-4 mt-2 shadow font-bold"
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

          <View className="pt-12">
            <Text className="font-bold text-[#323232] pb-2">
              ARRASTE PARA DEFINIR A ORDEM
            </Text>
            <DraggableFlatList
              data={addedExercises}
              keyExtractor={(item) => item.id.toString()}
              onDragEnd={({ data }) => setAddedExercises(data)}
              activationDistance={0} // Ativa arrasto quase imediato
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
            />
          </View>
          <AddExerciseBar
            count={addedExercises.length}
            mode="create"
            onPress={() => {
              console.log("CRIAR TREINO:", workoutName, addedExercises);
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
