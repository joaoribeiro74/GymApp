import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import useUserWorkouts from "../../../hooks/useUserWorkouts";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../../components/SearchInput";
import RecordList from "../../../components/RecordList";
export default function AllRecords() {
  const { workouts, workoutLogs, loading } = useUserWorkouts();
  const [search, setSearch] = useState("");

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

  return (
    <SafeAreaView className="flex-1 dark:bg-gray-900">
      <View className="px-4 pb-4">
        <Text className="text-sm font-bold text-[#323232] dark:text-white">
          BUSCAR RECORDE POR EXERCÍCIO OU CATEGORIA
        </Text>
        <SearchInput value={search} onChangeText={setSearch} />
      </View>
      <View className="flex-1">
        <RecordList
          logs={workoutLogs}
          templates={exerciseTemplates}
          search={search}
        />
      </View>
    </SafeAreaView>
  );
}
