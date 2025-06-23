import { useEffect, useState } from 'react';
import useFirebase from '../firebase/hooks/useFirebase';
import useAuth from '../firebase/hooks/useAuth';
import { collection, onSnapshot } from 'firebase/firestore';

type Exercise = {
  id: string;
  exercise: string;
  series: string;
  reps: string;
  weight: string;
};

type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
  notes?: string;
};
type Props = {
  workout: Workout;
};

export default function useUserWorkouts() {
  const { db } = useFirebase();
  const { user } = useAuth();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) return;

    const ref = collection(db, "users", user.uid, "workoutTemplates");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      setWorkouts(data);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [user, db]);

  return { workouts, loading };
}
