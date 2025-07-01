import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import toastConfig from "../CustomToast";

type EditProfileModalProps = {
  visible: boolean;
  onClose: () => void;
  weight: string;
  setWeight: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  goal: string;
  setGoal: (value: string) => void;
  avatar: string;
  setAvatar: (value: string) => void;
  pickImage: () => Promise<void>;
  onSave: () => Promise<void>;
  isDark: boolean;
};

export default function EditProfileModal({
  visible,
  onClose,
  weight,
  setWeight,
  height,
  setHeight,
  goal,
  setGoal,
  avatar,
  setAvatar,
  pickImage,
  onSave,
  isDark,
}: EditProfileModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-800 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between pt-4 pb-2">
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="chevron-down"
                size={30}
                color={isDark ? "#ffffff" : "#323232"}
              />
            </TouchableOpacity>
            <Text className="text-lg font-black text-[#323232] dark:text-white text-center flex-1">
              EDITAR PERFIL
            </Text>
            <View style={{ width: 30 }} />
          </View>

          <View className="items-center mb-6">
            <TouchableOpacity onPress={pickImage} accessibilityLabel="Selecionar imagem de perfil" accessibilityHint="Abre a galeria para selecionar uma nova imagem de perfil">
              {avatar ? (
                <Image source={{ uri: avatar }} className="w-[100px] h-[100px] rounded-full" />
              ) : (
                <View className="w-[100px] h-[100px] rounded-full justify-center items-center">
                  <FontAwesome name="user-circle-o" size={100} color={isDark ? "#ffffff" : "#323232"} />
                </View>
              )}
            </TouchableOpacity>
            <Text className="text-sm text-[#323232] dark:text-white mt-2">Toque para alterar a foto</Text>
            {avatar && (
              <TouchableOpacity onPress={() => setAvatar("")}>
                <Text className="text-xs text-[#E10000] mt-2">Remover foto</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="pt-6 pb-2">
            <Text className="text-sm font-bold text-[#323232] dark:text-white">OBJETIVO (Opcional)</Text>
            <TextInput
              value={goal}
              onChangeText={setGoal}
              cursorColor={isDark ? "#ffffff" : "#323232"}
              placeholder="Ex: Ganhar massa, Perder peso"
              className="bg-[#f6f6f6] dark:bg-gray-700 dark:text-white rounded-[8] px-4 py-3 mt-1 mb-4 shadow-sm shadow-black"
            />
          </View>

          <View className="pt-2 pb-2">
            <Text className="text-sm font-bold text-[#323232] dark:text-white">PESO ATUAL (KG)</Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              cursorColor={isDark ? "#ffffff" : "#323232"}
              keyboardType="numeric"
              className="bg-[#f6f6f6] dark:bg-gray-700 dark:text-white rounded-[8] px-4 py-3 mt-1 mb-4 shadow-sm shadow-black"
            />
          </View>

          <View className="pt-2 pb-2">
            <Text className="text-sm font-bold text-[#323232] dark:text-white">ALTURA (M)</Text>
            <TextInput
              value={height}
              onChangeText={setHeight}
              cursorColor={isDark ? "#ffffff" : "#323232"}
              keyboardType="numeric"
              className="bg-[#f6f6f6] dark:bg-gray-700 dark:text-white rounded-[8] px-4 py-3 mt-1 mb-4 shadow-sm shadow-black"
            />
          </View>

          <TouchableOpacity
            onPress={onSave}
            className="bg-[#323232] dark:bg-gray-700 items-center py-4 rounded-[8] mb-8"
          >
            <Text className="text-white text-base font-black">SALVAR</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <Toast config={toastConfig} />
    </Modal>
  );
}
