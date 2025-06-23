import { KeyboardAvoidingView, Platform, View } from "react-native";
import React from "react";
import EditExerciseCard from "../../../components/EditExerciseCard";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../../components/Loading";
import useUserWorkouts from "../../../hooks/useUserWorkouts";
import { FlatList } from "react-native-gesture-handler";

export default function HomeWorkouts() {
  const { workouts, loading } = useUserWorkouts();

  if (loading) return <Loading />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1">
        <View className="pb-8 flex-1">
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EditExerciseCard workout={item} />}
            // opcional: refresh control para pull-to-refresh
            // onRefresh={refreshFunction}
            // refreshing={refreshing}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
