import { useMemo } from "react";
import type { Workout } from "./useUserWorkouts"

const dayOrder: Record<string, number> = {
  "DOMINGO": 0,
  "SEGUNDA-FEIRA": 1,
  "TERÇA-FEIRA": 2,
  "QUARTA-FEIRA": 3,
  "QUINTA-FEIRA": 4,
  "SEXTA-FEIRA": 5,
  "SÁBADO": 6,
};

function getTodayDayIndex() {
  return new Date().getDay();
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

type WorkoutLog = {
  workoutId: string; 
  date: string | Date; 
};

export default function useNextWorkout(workouts: Workout[], workoutLogs: WorkoutLog[], currentDate = new Date()) {
  const todayIndex = currentDate.getDay();
  const today = currentDate;

  const nextWorkout = useMemo(() => {
    if (!workouts || workouts.length === 0) return null;

    const isWorkoutDoneToday = (workout: Workout) => {
      return workoutLogs.some(log => {
        if (log.workoutId !== workout.id) return false;
        const logDate = typeof log.date === "string" ? new Date(log.date) : log.date;
        return isSameDay(logDate, today);
      });
    };

    for (const workout of workouts) {
      if (typeof workout.day !== "string") continue;

      const workoutDayIndex = dayOrder[workout.day.toUpperCase()];
      if (workoutDayIndex === undefined) continue;

      if (workoutDayIndex === todayIndex && !isWorkoutDoneToday(workout)) {
        return workout;
      }
    }

    let foundWorkout: Workout | null = null;
    let smallestDaysAhead = 7;

    for (const workout of workouts) {
      if (typeof workout.day !== "string") continue;

      const workoutDayIndex = dayOrder[workout.day.toUpperCase()];
      if (workoutDayIndex === undefined) continue;

      const daysAhead = (workoutDayIndex - todayIndex + 7) % 7;

      if (daysAhead === 0) continue; 

      if (daysAhead < smallestDaysAhead) {
        foundWorkout = workout;
        smallestDaysAhead = daysAhead;
      }
    }

    return foundWorkout;
  }, [workouts, workoutLogs, todayIndex]);

  return nextWorkout;
}