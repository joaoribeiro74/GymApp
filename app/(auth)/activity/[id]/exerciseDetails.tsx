import { View, Text, ScrollView } from "react-native";
import React from "react";
import useUserWorkouts from "../../../../hooks/useUserWorkouts";
import Loading from "../../../../components/Loading";
import ViewExerciseCard from "../../../../components/ViewExerciseCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function exerciseDetails() {
  const { workoutLogs, loading } = useUserWorkouts();
  const { id } = useLocalSearchParams();

  if (loading) return <Loading />;

  const workoutLog = workoutLogs.find((log) => log.id === id);

  if (!workoutLog) {
    return (
      <View>
        <Text>Treino não encontrado.</Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-4">
          <ViewExerciseCard workoutLog={workoutLog} defaultExpanded={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
