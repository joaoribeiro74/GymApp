import { View, Text, ScrollView } from "react-native";
import React from "react";
import useUserWorkouts from "../../../../hooks/useUserWorkouts";
import Loading from "../../../../components/Loading";
import ViewExerciseCard from "../../../../components/ViewExerciseCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function workoutDetails() {
  const { workoutLogs, loading } = useUserWorkouts();
  const { id } = useLocalSearchParams();

  if (loading) return <Loading />;

  const workoutLog = workoutLogs.find((log) => log.id === id);

  if (!workoutLog) {
    return (
      <View className="flex-1 dark:bg-gray-800 items-center justify-center">
        <View className="bg-white p-4 rounded-xl shadow-sm shadow-black items-center justify-center mx-4">
          <Text className="text-center text-md text-[#323232] dark:text-white font-bold mt-4 mb-2">
            Treino não encontrado.
          </Text>
          <Text className="text-xs text-[#666] text-center mb-4 dark:text-gray-400">
            Crie e faça um treino para ver ele aqui!
          </Text>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 dark:bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-4">
          <ViewExerciseCard workoutLog={workoutLog} defaultExpanded={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
