import React from "react";
import { View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function SearchInput({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) {
  const { isDark } = useTheme();
  return (
    <View
      className="bg-white dark:bg-gray-800 rounded-[50] px-2 py-2 mt-3 flex-row items-center shadow-md shadow-black mb-8">
      <View className="bg-[#EBEBEB] dark:bg-gray-700 py-4 px-2 rounded-full mr-2">
        <FontAwesome5
          name="search"
          size={20}
          color={isDark ? "#ffffff" : "#323232"}
          style={{ marginRight: 8, marginLeft: 8 }}
        />
      </View>
      <TextInput
        className="flex-1 text-[#323232] dark:text-white font-bold text-md"
        value={value}
        onChangeText={onChangeText}
        cursorColor={isDark ? "#ffffff" : "#323232"}
      />
    </View>
  );
}
