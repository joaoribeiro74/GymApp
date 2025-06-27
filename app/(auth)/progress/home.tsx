import { View, ScrollView } from "react-native";
import React, { useMemo } from "react";
import ProgressWeight from "../../../components/ProgressWeight";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserWorkouts, { WorkoutLog } from "../../../hooks/useUserWorkouts";
import RecordSummary from "../../../components/RecordSummary";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import { router } from "expo-router";

function filterLast30Days(logs: WorkoutLog[]) {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return logs.filter((log) => {
    return log.date >= thirtyDaysAgo && log.date <= today;
  });
}

export default function HomeProgress() {
  const { workouts, workoutLogs, loading } = useUserWorkouts();
  const last30DaysLogs = useMemo(
    () => filterLast30Days(workoutLogs),
    [workoutLogs]
  );

  const exerciseTemplates = useMemo(() => {
    const map = new Map();

    workouts.forEach((workout) => {
      workout.exercises.forEach((ex) => {
        if (!map.has(ex.id)) {
          map.set(ex.id, {
            id: ex.id,
            name: ex.exercise,
            category: ex.category,
          });
        }
      });
    });

    return Array.from(map.values());
  }, [workouts]);

  if (loading) return <Loading />;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="px-4 pb-4">
          <View>
            <ProgressWeight />
            <RecordSummary
              logs={last30DaysLogs}
              templates={exerciseTemplates}
            />
          </View>
          <View className="pt-4">
          <StyledButton
            variant="custom"
            title="VER TODOS OS RECORDES"
            onPress={() => router.push("/(auth)/progress/allRecords")}
          />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
