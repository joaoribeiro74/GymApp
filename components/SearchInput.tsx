import React from "react";
import { View, TextInput } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function SearchInput({ value, onChangeText }: { value: string; onChangeText: (text: string) => void }) {
  return (
    <View
      className="bg-white rounded-[50] px-2 py-2 mt-3 flex-row items-center shadow mb-8"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View className="bg-[#EBEBEB] py-4 px-2 rounded-full mr-2">
        <FontAwesome5 name="search" size={20} color="#323232" style={{ marginRight: 8, marginLeft: 8 }} />
      </View>
      <TextInput
        className="flex-1 text-[#323232] font-bold text-md"
        value={value}
        onChangeText={onChangeText}
        cursorColor="#323232"
      />
    </View>
  );
}
