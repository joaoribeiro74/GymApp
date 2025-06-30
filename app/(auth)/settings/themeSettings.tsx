import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../theme/ThemeContext";

export default function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <View className="flex-1">
      <View className="bg-white rounded-b-[30] shadow-sm shadow-black">

        <TouchableOpacity
          className="flex-row items-center px-4 py-6 gap-4"
          onPress={() => {
            if (isDark) toggleTheme(); // troca para claro
          }}
        >
          <Ionicons name="sunny" size={24} color="#323232" />
          <View>
            <Text className="font-bold text-base">Modo Claro</Text>
            <Text className="text-xs text-[#323232]">
              {isDark ? "Desativado" : "Ativado"}
            </Text>
          </View>
        </TouchableOpacity>

        <View className="border-t border-[#323232] opacity-10 mx-4" />
        <TouchableOpacity
          className="flex-row items-center px-4 py-6 gap-4"
          onPress={() => {
            if (!isDark) toggleTheme(); 
          }}
        >
          <Ionicons name="moon" size={24} color="#323232" />
          <View>
            <Text className="font-bold text-base">Modo Escuro</Text>
            <Text className="text-xs text-[#323232]">
              {isDark ? "Ativado" : "Desativado"}
            </Text>
          </View>
        </TouchableOpacity>

        <View className="p-6" />
      </View>
    </View>
  );
}
