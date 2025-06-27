import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserWorkouts from "../../../hooks/useUserWorkouts";
import { FlatList } from "react-native-gesture-handler";
import WorkoutStructureCard from "../../../components/WorkoutStructureCard";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import StyledButton from "../../../components/StyledButton";
import { router } from "expo-router";

const dayOrder: { [key: string]: number } = {
  DOMINGO: 0,
  "SEGUNDA-FEIRA": 1,
  "TERÇA-FEIRA": 2,
  "QUARTA-FEIRA": 3,
  "QUINTA-FEIRA": 4,
  "SEXTA-FEIRA": 5,
  SÁBADO: 6,
};
export default function HomeWorkouts() {
  const { workouts } = useUserWorkouts();

  const sortedWorkouts = [...workouts].sort((a, b) => {
    return (dayOrder[a.day] ?? 99) - (dayOrder[b.day] ?? 99); // fallback para casos inesperados
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1">
        <View className="pb-8 flex-1">
          {sortedWorkouts.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <View className="bg-white p-4 rounded-xl shadow-sm items-center justify-center">
                <Text className="text-center text-md text-[#323232] font-bold mt-4 mb-2">
                  Nenhum treino encontrado.
                </Text>
                <Text className="text-xs text-[#666] text-center mb-4">
                  Crie um novo treino para ver eles aqui!
                </Text>
                <StyledButton
                  variant="default"
                  title="CRIAR TREINO"
                  onPress={() => router.push("/(auth)/workouts/create")}
                >
                  <Text className="text-white text-center font-bold">
                    CRIAR TREINO
                  </Text>
                </StyledButton>
              </View>
            </View>
          ) : (
            <FlatList
              data={sortedWorkouts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <WorkoutStructureCard workout={item} />}
              contentContainerStyle={{ padding: 16 }}
            />
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
