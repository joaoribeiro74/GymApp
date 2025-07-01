import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type AddExerciseCardProps = {
  name: string;
  category: string;
  added?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  mode?: "select" | "edit";
};
export default function AddExerciseCard({
  name,
  category,
  added,
  onToggle,
  onDelete,
  mode = "select",
}: AddExerciseCardProps) {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-[10] p-2 mb-2 flex flex-row items-center min-h-[100px] shadow-sm shadow-black">
      <View className="p-2 flex-col flex-1">
        <Text className="text-lg font-black text-[#323232] dark:text-white">{name}</Text>
        <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">{category}</Text>
      </View>

      {mode === "select" ? (
        <TouchableOpacity className="p-2" onPress={onToggle}>
          <Ionicons
            name={added ? "remove-circle" : "add-circle"}
            size={30}
            color={added ? "#E10000" : "#1DAA2D"}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className="p-2" onPress={onDelete}>
          <Ionicons name="trash" size={30} color="#E10000" />
        </TouchableOpacity>
      )}
    </View>
  );
}
