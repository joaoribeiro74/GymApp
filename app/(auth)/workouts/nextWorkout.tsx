import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import useUserWorkouts from "../../../hooks/useUserWorkouts";
import Loading from "../../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import EditExerciseCard from "../../../components/EditExerciseCard";
import useNextWorkout from "../../../hooks/useNextWorkout";
import StyledButton from "../../../components/StyledButton";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
export default function nextWorkout() {
  const { workouts, workoutLogs, loading } = useUserWorkouts();
  const nextWorkout = useNextWorkout(workouts, workoutLogs);

  if (loading) return <Loading />;

  if (!nextWorkout) {
    return (
      <View className="flex-1 items-center justify-center">
        <View className="bg-white p-4 rounded-xl shadow-sm items-center justify-center">
          <Text className="text-center text-md text-[#323232] font-bold mt-4 mb-2">
            Nenhum treino encontrado.
          </Text>
          <Text className="text-xs text-[#666] text-center mb-4">
            Crie um novo treino para ver eles aqui!
          </Text>
          <StyledButton
            variant="default"
            title="CRIAR TREINO"
            onPress={() => router.push("/(auth)/workouts/create")}
          >
            <Text className="text-white text-center font-bold">
              CRIAR TREINO
            </Text>
          </StyledButton>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // ajuste conforme seu header/safe area
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 16,
            paddingBottom: 80,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <EditExerciseCard workout={nextWorkout} defaultExpanded={true} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
