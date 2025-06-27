import { useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import useFirebase from "../firebase/hooks/useFirebase";
import useAuth from "../firebase/hooks/useAuth";
import { Workout } from "./useUserWorkouts";

type ExerciseState = {
  series: string;
  reps: string[];
  weights: string[];
};

type ExerciseStates = Record<string, ExerciseState>;

export function useSaveWorkout(
  workout: Workout,
  exerciseStates: ExerciseStates,
  setExerciseStates: React.Dispatch<React.SetStateAction<ExerciseStates>>,
  generalNote: string,
  setGeneralNote: React.Dispatch<React.SetStateAction<string>>,
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { db } = useFirebase();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = async (selectedDate?: Date) => {
    if (!user || !db) return;

    const hasEmptyFields = Object.values(exerciseStates).some((state) => {
      return (
        !state.series ||
        state.reps.some((r) => r.trim() === "") ||
        state.weights.some((w) => w.trim() === "")
      );
    });

    if (hasEmptyFields) {
      Toast.show({
        type: "customError",
        text1: "Preencha todas as séries, repetições e pesos!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const now = new Date();
      const logDate = selectedDate ?? new Date();

      if (logDate > now) {
        Toast.show({
          type: "customError",
          text1: "Não é possível salvar para data futura",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
          swipeable: true,
        });
        return;
      }

      const dayMap: Record<string, number> = {
        "DOMINGO": 0,
        "SEGUNDA-FEIRA": 1,
        "TERÇA-FEIRA": 2,
        "QUARTA-FEIRA": 3,
        "QUINTA-FEIRA": 4,
        "SEXTA-FEIRA": 5,
        "SÁBADO": 6,
      };

      const workoutDayIndex = dayMap[workout.day.toUpperCase()];
      const logDayIndex = logDate.getDay();

      if (workoutDayIndex === undefined) {
        Toast.show({
          type: "customError",
          text1: "Dia do treino inválido",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
          swipeable: true,
        });
        setLoading(false);
        return;
      }

      if (workoutDayIndex !== logDayIndex) {
        Toast.show({
          type: "customError",
          text1: `Só é possível salvar o treino do dia`,
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
          swipeable: true,
        });
        setLoading(false);
        return;
      }

      const logData = {
        workoutId: workout.id,
        name: workout.name,
        date: logDate,
        notes: generalNote || "",
        exercises: workout.exercises.map((ex) => {
          const state = exerciseStates[ex.id];
          return {
            exerciseId: ex.id,
            exercise: ex.exercise,
            series: parseInt(state.series),
            reps: state.reps,
            weights: state.weights,
          };
        }),
      };

      await addDoc(collection(db, "users", user.uid, "workoutLogs"), logData);

      Toast.show({
        type: "customSuccess",
        text1: "Treino salvo no histórico!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });

      // Limpar estados para novo treino
      const clearedStates: typeof exerciseStates = {};
      workout.exercises.forEach((ex) => {
        const numSeries = parseInt(ex.series ?? "0");
        clearedStates[ex.id] = {
          series: ex.series ?? "",
          reps: Array(numSeries).fill(""),
          weights: Array(numSeries).fill(""),
        };
      });

      setExerciseStates(clearedStates);
      setGeneralNote("");
      setExpanded(false);
    } catch (error) {
      Toast.show({
        type: "customError",
        text1: "Erro ao salvar o treino!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleSave, loading };
}
