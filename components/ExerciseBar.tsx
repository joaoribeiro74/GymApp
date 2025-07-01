import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

type AddExerciseBarProps = {
  count: number;
  onPress?: () => void;
  mode?: "view" | "create" | "edit";
};
export default function AddExerciseBar({
  count,
  onPress,
  mode = "view",
}: AddExerciseBarProps) {
  const { isDark } = useTheme();

  return (
    <View className="bg-white dark:bg-gray-800 p-3 flex flex-row items-center">
      <View className="mr-2">
        <FontAwesome6 name="dumbbell" size={24} color={isDark ? "#ffffff" : "#323232"} />
      </View>
      <View className="flex-col">
        <Text className="text-[10px] font-bold text-[#323232] dark:text-white">
          EXERCÍCIOS ADICIONADOS:
        </Text>
        <Text className="text-sm font-black text-[#323232] dark:text-white">{count}</Text>
      </View>
      <View className="ml-auto">
        {mode === "view" && (
          <TouchableOpacity
            onPress={onPress}
            className="bg-[#323232] dark:bg-gray-700 items-center py-3 px-6 rounded-[8]"
          >
            <Text className="text-[10px] font-bold text-white justify-center">
              VER EXERCÍCIOS
            </Text>
          </TouchableOpacity>
        )}
        {mode === "create" && (
          <TouchableOpacity
            onPress={onPress}
            className="bg-[#323232] dark:bg-gray-700 items-center py-3 px-12 rounded-[8]"
          >
            <Text className="text-[10px] font-bold text-white justify-center">
              CRIAR
            </Text>
          </TouchableOpacity>
        )}
        {mode === "edit" && (
          <TouchableOpacity
            onPress={onPress}
            className="bg-[#323232] items-center dark:bg-gray-700 py-3 px-12 rounded-[8]"
          >
            <Text className="text-[10px] font-bold text-white justify-center">
              EDITAR
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
