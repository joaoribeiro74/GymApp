import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React from "react";
import useUserWorkouts from "../../../hooks/useUserWorkouts";
import Loading from "../../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import EditExerciseCard from "../../../components/EditExerciseCard";
import useNextWorkout from "../../../hooks/useNextWorkout";
export default function nextWorkout() {
  const { workouts, workoutLogs, loading } = useUserWorkouts();
  const nextWorkout = useNextWorkout(workouts, workoutLogs);

  if (loading) return <Loading />;

  if (!nextWorkout) {
    return (
      <View className="bg-white rounded-[10] p-4">
        <Text>Nenhum treino encontrado.</Text>
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
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
        >
          <EditExerciseCard workout={nextWorkout} defaultExpanded={true} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
