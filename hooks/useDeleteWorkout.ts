import { deleteDoc, doc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import useFirebase from "../firebase/hooks/useFirebase";
import useAuth from "../firebase/hooks/useAuth";
import { useState } from "react";
import { Alert } from "react-native";

export function useDeleteWorkout() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDeleteWorkout = (workoutId: string) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esse treino?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        onPress: async () => {
          if (loading || !user || !db) return;
          setLoading(true);
          try {
            await deleteDoc(doc(db, "users", user.uid, "workoutTemplates", workoutId));
            Toast.show({
              type: "customSuccess",
              text1: "Treino excluído com sucesso!",
              position: "top",
            });
          } catch (error) {
            console.error("Erro ao excluir treino:", error);
            Toast.show({
              type: "customError",
              text1: "Erro ao excluir treino!",
              position: "top",
            });
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return { handleDeleteWorkout, loading };
}
