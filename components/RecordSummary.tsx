import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { WorkoutLog } from "../hooks/useUserWorkouts";

type ExerciseTemplate = {
  id: string;
  name: string;
  category: string;
};
type Props = {
  logs: WorkoutLog[];
  templates: ExerciseTemplate[];
};

type RecordEntry = {
  exercise: string;
  maxWeight: number;
  category: string;
};

function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Shuffle determinístico com seed simples (Linear Congruential Generator)
function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let random = seed;

  function randomNext() {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(randomNext() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default function RecordSummary({ logs, templates }: Props) {
  const topRecords = useMemo(() => {
    const recordMap = new Map<string, RecordEntry>();
    const templateMap = new Map(
      templates.map((t) => [t.id, { name: t.name, category: t.category }])
    );

    logs.forEach((log) => {
      log.exercises.forEach((ex) => {
        ex.weights.forEach((w) => {
          const parsed = parseFloat(w.replace(",", "."));
          if (!isNaN(parsed)) {
            const tpl = templateMap.get(ex.exerciseId);
            const category = tpl?.category ?? "Desconhecido";

            const prev = recordMap.get(ex.exerciseId);
            if (!prev || parsed > prev.maxWeight) {
              recordMap.set(ex.exerciseId, {
                exercise: tpl?.name ?? ex.exercise,
                maxWeight: parsed,
                category,
              });
            }
          }
        });
      });
    });

    const records = Array.from(recordMap.values());

    const week = getWeekNumber(new Date());

    const shuffled = seededShuffle(records, week);

    return shuffled.slice(0, 5);
  }, [logs, templates]);

  return (
    <View>
      <Text className="text-md text-black font-black mb-2">
        RECORDES RECENTES
      </Text>

      {topRecords.length === 0 ? (
        <View className="bg-white p-4 rounded-xl shadow-sm shadow-black items-center justify-center">
          <Text className="text-sm font-bold text-[#323232] mb-2">
            Nenhum recorde encontrado ainda.
          </Text>
          <Text className="text-xs text-[#666] font-normal text-center mb-2">
            Registre seus treinos com peso para acompanhar seus recordes aqui!
          </Text>
        </View>
      ) : (
        topRecords.map((rec, idx) => (
          <View
            key={idx}
            className="bg-white p-3 rounded-xl mb-2 shadow-sm shadow-black flex-row justify-between items-center"
          >
            <View>
              <Text className="font-black text-sm">
                {rec.exercise.toUpperCase()}
              </Text>
              <Text className="text-xs font-bold text-[#323232]">
                {rec.category.toUpperCase()}
              </Text>
            </View>
            <Text className="font-bold text-sm text-right">
              {rec.maxWeight} KG
            </Text>
          </View>
        ))
      )}
    </View>
  );
}
