import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "../../../context/ThemeContext";
import { colorScheme } from "nativewind";

export default function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View className="flex-1 dark:bg-gray-900">
      <View className="bg-white dark:bg-gray-800 rounded-b-[30] shadow-sm shadow-black">
        <TouchableOpacity
          className="flex-row items-center px-4 py-6 gap-4"
          onPress={() => {
            if (isDark) toggleTheme();
          }}
        >
          <Ionicons name="sunny" size={24} color={isDark ? "#fff" : "#323232"} />
          <View>
            <Text className="font-bold text-base dark:text-white">Modo Claro</Text>
            <Text className="text-xs text-[#323232] dark:text-gray-400">
              {isDark ? "Desativado" : "Ativado"}
            </Text>
          </View>
        </TouchableOpacity>

        <View className="border-t border-[#323232] dark:border-white opacity-10 mx-4" />
        <TouchableOpacity
          className="flex-row items-center px-4 py-6 gap-4"
          onPress={() => {
            if (!isDark) toggleTheme();
          }}
        >
          <Ionicons name="moon" size={24} color={isDark ? "#fff" : "#323232"} />
          <View>
            <Text className="font-bold text-base dark:text-white">Modo Escuro</Text>
            <Text className="text-xs text-[#323232] dark:text-gray-400">
              {isDark ? "Ativado" : "Desativado"}
            </Text>
          </View>
        </TouchableOpacity>

        <View className="p-6" />
      </View>
    </View>
  );
}
