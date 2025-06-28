import React, { useMemo } from "react";
import { FlatList, View, Text } from "react-native";
import { WorkoutLog } from "../hooks/useUserWorkouts";

type ExerciseTemplate = {
  id: string;
  name: string;
  category: string;
};

type Props = {
  logs: WorkoutLog[];
  templates: ExerciseTemplate[];
  search: string;
};

type RecordEntry = {
  exercise: string;
  maxWeight: number;
  category: string;
  lastDate: Date;
};

export default function RecordsList({ logs, templates, search }: Props) {
  const records = useMemo(() => {
    const map = new Map<string, RecordEntry>();
    const logsSafe = Array.isArray(logs) ? logs : [];

    logsSafe.forEach((log) => {
      if (!Array.isArray(log.exercises)) return;
      log.exercises.forEach((ex) => {
        const maxWeightInLog = ex.weights.reduce((max, w) => {
          const weightNum = Number(w);
          return weightNum > max ? weightNum : max;
        }, 0);

        if (maxWeightInLog > 0) {
          const existing = map.get(ex.exerciseId);
          if (!existing || maxWeightInLog > existing.maxWeight) {
            const template = templates.find((t) => t.id === ex.exerciseId);
            map.set(ex.exerciseId, {
              exercise: ex.exercise,
              maxWeight: maxWeightInLog,
              category: template ? template.category : "Desconhecida",
              lastDate: log.date,
            });
          } else if (
            existing &&
            maxWeightInLog === existing.maxWeight &&
            log.date > existing.lastDate
          ) {
            existing.lastDate = log.date;
            map.set(ex.exerciseId, existing);
          }
        }
      });
    });

    return Array.from(map.values());
  }, [logs, templates]);

  const filteredRecords = useMemo(() => {
    if (!search.trim()) return records;
    const lowerSearch = search.toLowerCase();
    return records.filter(
      (r) =>
        r.exercise.toLowerCase().includes(lowerSearch) ||
        r.category.toLowerCase().includes(lowerSearch)
    );
  }, [search, records]);

  function renderItem({ item }: { item: RecordEntry }) {
    return (
      <View>
        <View className="bg-white p-3 rounded-xl mb-2 shadow-sm shadow-black flex-row justify-between items-center">
          <View>
            <Text className="font-black text-sm">
              {item.exercise.toUpperCase()}
            </Text>
            <Text className="text-xs font-bold text-[#323232]">
              {item.category.toUpperCase()}
            </Text>
            <Text className="text-[#323232] font-light text-sm">
              {item.lastDate.toLocaleDateString()}
            </Text>
          </View>
          <Text className="font-bold text-sm text-right">
            {item.maxWeight} KG
          </Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredRecords}
      keyExtractor={(item) => item.exercise}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text className="text-center text-md text-[#323232] font-bold mt-4">
          NENHUM RECORDE ENCONTRADO PARA ESTE EXERCÍCIO.
        </Text>
      }
    />
  );
}
