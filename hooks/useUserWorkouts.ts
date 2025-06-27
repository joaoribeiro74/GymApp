import { useEffect, useState } from "react";
import useFirebase from "../firebase/hooks/useFirebase";
import useAuth from "../firebase/hooks/useAuth";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { z } from "zod";

const ExerciseSchema = z.object({
  id: z.string(),
  exercise: z.string(),
  category: z.string(),
  series: z.string().optional(),
  reps: z.string().optional(),
  weight: z.string().optional(),
});

const WorkoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  day: z.string(),
  exercises: z.array(ExerciseSchema),
  notes: z.string().optional(),
});

const WorkoutLogExerciseSchema = z.object({
  exerciseId: z.string(),
  exercise: z.string(),
  series: z.number(),
  reps: z.array(z.string()),
  weight: z.array(z.string()),
});

const WorkoutLogSchema = z.object({
  id: z.string(),
  workoutId: z.string(),
  name: z.string(),
  date: z.date(),
  notes: z.string().optional(),
  exercises: z.array(WorkoutLogExerciseSchema),
});

export type Workout = z.infer<typeof WorkoutSchema>;
export type WorkoutLog = z.infer<typeof WorkoutLogSchema>;
export default function useUserWorkouts() {
  const { db } = useFirebase();
  const { user } = useAuth();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) return;

    setLoading(true);

    // Subcoleção com os templates de treino
    const workoutsRef = collection(db, "users", user.uid, "workoutTemplates");
    // Subcoleção com logs de treino realizados
    const logsRef = collection(db, "users", user.uid, "workoutLogs");

    const unsubscribeWorkouts = onSnapshot(workoutsRef, (snapshot) => {
      const parsedWorkouts: Workout[] = [];

      snapshot.docs.forEach((doc) => {
        const raw = doc.data();

        const normalizedData = {
          ...raw,
          id: doc.id,
          day: Array.isArray(raw.day)
            ? raw.day[0] ?? ""
            : typeof raw.day === "string"
            ? raw.day
            : "",
          exercises: Array.isArray(raw.exercises) ? raw.exercises : [],
        };
        const result = WorkoutSchema.safeParse(normalizedData);

        if (result.success) {
          parsedWorkouts.push(result.data);
        } else {
          console.warn("Dados inválidos do treino:", result.error);
        }
      });

      setWorkouts(parsedWorkouts);
    });

    const unsubscribeLogs = onSnapshot(logsRef, (snapshot) => {
      const parsedLogs: WorkoutLog[] = [];

      snapshot.docs.forEach((doc) => {
        const raw = doc.data();

        const normalizedData = {
          id: doc.id,
          workoutId: raw.workoutId ?? "",
          name: raw.name ?? "",
          notes: raw.notes ?? "",
          date:
            raw.date instanceof Timestamp
              ? raw.date.toDate()
              : new Date(raw.date ?? Date.now()),
          exercises: Array.isArray(raw.exercises)
            ? raw.exercises.map((ex: any) => ({
                exerciseId: ex.exerciseId ?? "",
                exercise: ex.exercise ?? "",
                series: typeof ex.series === "number" ? ex.series : 0,
                reps: Array.isArray(ex.reps)
                  ? ex.reps.map((r: string) => r.toString())
                  : [],

                weight: Array.isArray(ex.weight)
                  ? ex.weight.map((w: string) => w.toString())
                  : [],
              }))
            : [],
        };

        const result = WorkoutLogSchema.safeParse(normalizedData);

        if (result.success) {
          parsedLogs.push(result.data);
        } else {
          console.warn("Dados inválidos do log de treino:", result.error);
        }
      });

      setWorkoutLogs(parsedLogs);
      setLoading(false);
    });

    return () => {
      unsubscribeWorkouts();
      unsubscribeLogs();
    };
  }, [user, db]);

  return { workouts, workoutLogs, loading };
}
