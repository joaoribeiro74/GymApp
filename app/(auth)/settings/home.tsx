import { View, Text, TouchableOpacity, ListRenderItem } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "../../../context/ThemeContext";
interface SettingsOption {
  key: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
}

const options: SettingsOption[] = [
  {
    key: "username",
    title: "Nome de usuário",
    description: "Alterar seu nome de usuário",
    icon: "person",
    screen: "settings/editUsername",
  },
  {
    key: "password",
    title: "Redefinir senha",
    description: "Enviar e-mail para redefinir a senha",
    icon: "lock-closed",
    screen: "settings/resetPassword",
  },
  {
    key: "theme",
    title: "Tema",
    description: "Alternar entre claro e escuro",
    icon: "moon",
    screen: "settings/themeSettings",
  },
];
export default function HomeSettings() {
  const navigation = useNavigation();
  const { isDark } = useTheme();

  const renderItem: ListRenderItem<SettingsOption> = ({ item, index }) => {
    const isLastItem = index === options.length - 1;

    return (
      <View className="flex-1">
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen as never)}
          className="flex-row dark:bg-gray-800 items-center px-4 py-6 gap-4"
        >
          <Ionicons name={item.icon} size={24} color={isDark ? "#ffffff" : "#323232"}/>
          <View>
            <Text className="font-bold text-base dark:text-white">{item.title}</Text>
            <Text className="text-xs text-[#323232] dark:text-gray-400">{item.description}</Text>
          </View>
          <View className="ml-auto">
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#ffffff" : "#323232"} />
          </View>
        </TouchableOpacity>

        {!isLastItem && (
          <View className="border-t border-[#323232] dark:border-gray-400 opacity-10" />
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 dark:bg-gray-900">
      <View className="bg-white dark:bg-gray-800 rounded-b-[30] shadow-sm shadow-black">
        <FlatList
          data={options}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
        />
        <View className="p-6" />
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-[#323232] text-center font-black opacity-15 text-2xl dark:text-white">Versão 1.0.0</Text>
      </View>
    </View>
  );
}
