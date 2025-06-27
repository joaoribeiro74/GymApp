import { useState, useEffect } from "react";
import { Workout } from "./useUserWorkouts";

type ExerciseState = {
  series: string;
  reps: string[];
  weights: string[];
};

export function useExerciseStates(workout: Workout) {
  const [exerciseStates, setExerciseStates] = useState<Record<string, ExerciseState>>({});

  useEffect(() => {
    const initialStates: Record<string, ExerciseState> = {};
    workout.exercises.forEach((ex) => {
      const numSeries = parseInt(ex.series ?? "0");
      initialStates[ex.id] = {
        series: ex.series ?? "",
        reps: Array(numSeries).fill(""),
        weights: Array(numSeries).fill(""),
      };
    });
    setExerciseStates(initialStates);
  }, [workout]);

  const handleSeriesChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setExerciseStates((prev) => {
      const prevReps = prev[id]?.reps || [];
      const prevWeights = prev[id]?.weights || [];
      return {
        ...prev,
        [id]: {
          series: value,
          reps: Array(num)
            .fill("")
            .map((_, i) => prevReps[i] || ""),
          weights: Array(num)
            .fill("")
            .map((_, i) => prevWeights[i] || ""),
        },
      };
    });
  };

  const handleRepsChange = (id: string, index: number, value: string) => {
    setExerciseStates((prev) => {
      const updated = [...prev[id].reps];
      updated[index] = value;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          reps: updated,
        },
      };
    });
  };

  const handleWeightChange = (id: string, index: number, value: string) => {
    setExerciseStates((prev) => {
      const updated = [...prev[id].weights];
      updated[index] = value;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          weights: updated,
        },
      };
    });
  };

  return {
    exerciseStates,
    handleSeriesChange,
    handleRepsChange,
    handleWeightChange,
    setExerciseStates,
  };
}
