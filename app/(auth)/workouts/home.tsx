import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import EditExerciseCard from "../../../components/EditExerciseCard";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Loading from "../../../components/Loading";
import useUserWorkouts, { Workout } from "../../../hooks/useUserWorkouts";
import { FlatList } from "react-native-gesture-handler";
import WorkoutStructureCard from "../../../components/WorkoutStructureCard";
import Toast from "react-native-toast-message";
import toastConfig from "../../../components/CustomToast";
import AddExerciseBar from "../../../components/AddExerciseBar";
import { Ionicons } from "@expo/vector-icons";
import AddExerciseCard from "../../../components/AddExerciseCard";
import useCollection from "../../../firebase/hooks/useCollection";
import SearchInput from "../../../components/SearchInput";

const dayOrder: { [key: string]: number } = {
  DOMINGO: 0,
  "SEGUNDA-FEIRA": 1,
  "TERÇA-FEIRA": 2,
  "QUARTA-FEIRA": 3,
  "QUINTA-FEIRA": 4,
  "SEXTA-FEIRA": 5,
  SÁBADO: 6,
};
export default function HomeWorkouts() {
  const { workouts } = useUserWorkouts();

  const sortedWorkouts = [...workouts].sort((a, b) => {
    return (dayOrder[a.day] ?? 99) - (dayOrder[b.day] ?? 99); // fallback para casos inesperados
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1">
        <View className="pb-8 flex-1">
          <FlatList
            data={sortedWorkouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <WorkoutStructureCard workout={item} />}
            // opcional: refresh control para pull-to-refresh
            // onRefresh={refreshFunction}
            // refreshing={refreshing}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
