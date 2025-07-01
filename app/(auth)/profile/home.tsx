import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useDocument from "../../../firebase/hooks/useDocument";
import useAuth from "../../../firebase/hooks/useAuth";
import User from "../../../types/User";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import toastConfig from "../../../components/CustomToast";
import MaskInput from "react-native-mask-input";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../../../context/ThemeContext";
import EditProfileModal from "../../../components/Modals/EditProfileModal";

export default function home() {
  const { user } = useAuth();
  const { data, upsert } = useDocument<User>("users", user?.uid ?? "");
  const [modalVisible, setModalVisible] = useState(false);
  const { isDark } = useTheme();

  const [weight, setWeight] = useState(data?.weight?.toString() ?? "");
  const [height, setHeight] = useState(data?.height?.toString() ?? "");
  const [goal, setGoal] = useState(data?.goal ?? "");
  const [avatar, setAvatar] = useState(data?.avatar ?? "");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Toast.show({
        type: "customError",
        text1: "Permissão negada para acessar a galeria.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  React.useEffect(() => {
    if (modalVisible && data) {
      if (data.weight?.toString() !== weight)
        setWeight(data.weight?.toString() ?? "");
      if (data.height?.toString() !== height)
        setHeight(data.height?.toString() ?? "");
      if (data.goal !== goal) setGoal(data.goal ?? "");
      if (data.avatar !== avatar) setAvatar(data.avatar ?? "");
    }
  }, [modalVisible, data]);
  const handleSave = async () => {
    if (!data?.email || !data?.username) return;

    if (!weight.trim() || !height.trim()) {
      Toast.show({
        type: "customError",
        text1: "Preencha peso e altura corretamente!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    const newWeight = Number(weight);
    const newHeight = Number(height);
    const originalWeight = Number(data.weight);
    const originalHeight = Number(data.height);
    const originalGoal = data.goal ?? "";

    const heightPattern = /^\d+(\.\d{1,2})?$/;
    const MAX_WEIGHT = 500;

    if (isNaN(newWeight) || newWeight <= 0 || newWeight > MAX_WEIGHT) {
      Toast.show({
        type: "customError",
        text1: "Preencha o peso corretamente!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    if (!heightPattern.test(height)) {
      Toast.show({
        type: "customError",
        text1: "Preencha a altura corretamente!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    const goalUnchanged = goal.trim() === originalGoal.trim();
    const weightUnchanged = newWeight === originalWeight;
    const heightUnchanged = newHeight === originalHeight;
    const avatarUnchanged = avatar === data.avatar;

    if (
      goalUnchanged &&
      weightUnchanged &&
      heightUnchanged &&
      avatarUnchanged
    ) {
      Toast.show({
        type: "customError",
        text1: "Nenhuma modificação foi feita.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const weightHistory = [...(data?.weightHistory ?? [])];

    const alreadyRegisteredToday = weightHistory.some(
      (entry) => entry.date.split("T")[0] === today
    );

    if (!weightUnchanged && alreadyRegisteredToday) {
      Toast.show({
        type: "customError",
        text1: "Você já registrou seu peso hoje!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true,
      });
      return;
    }

    if (!alreadyRegisteredToday) {
      weightHistory.push({
        date: new Date().toISOString(),
        weight: newWeight,
      });
    }

    const { id, ...cleanedData } = data;

    const updatedUser = {
      ...cleanedData,
      weight: newWeight,
      height: newHeight,
      goal,
      weightHistory,
    };

    if (!avatarUnchanged) {
      updatedUser.avatar = avatar ?? null;
    }

    await upsert(updatedUser);

    Toast.show({
      type: "customSuccess",
      text1: "Perfil atualizado!",
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
      swipeable: true,
    });

    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  };

  const calculateIMC = () => {
    if (!data?.weight || !data?.height) return "0";
    const imc = data.weight / (data.height * data.height);
    return imc.toFixed(2); // retorna uma string!
  };

  const getIMCClassification = () => {
    const imc = parseFloat(calculateIMC());
    if (isNaN(imc)) return "-";

    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 24.9) return "Peso normal";
    if (imc < 29.9) return "Sobrepeso";
    if (imc < 34.9) return "Obesidade I";
    if (imc < 39.9) return "Obesidade II";
    return "Obesidade III";
  };

  return (
    <View className="flex-1 dark:bg-gray-900">
      <View className="bg-white dark:bg-gray-800 rounded-b-[30] shadow-md shadow-black px-8 pt-8 pb-8">
        <View className="items-center flex-row gap-4 justify-center">
          {data?.avatar ? (
            <Image
              source={{ uri: data?.avatar }}
              className="w-[80px] h-[80px] rounded-full"
            />
          ) : (
            <View className="w-[80px] h-[80px] rounded-full">
              <FontAwesome
                name="user-circle-o"
                size={80}
                color={isDark ? "#ffffff" : "#323232"}
              />
            </View>
          )}
          <View>
            <Text className="text-xl font-bold text-[#323232] dark:text-white">
              {data?.username?.toUpperCase()}
            </Text>
            <Text className="text-sm text-[#323232] dark:text-white font-normal">
              {user?.email}
            </Text>
          </View>
        </View>

        <View className="mt-8 flex w-full">
          <View className="flex-row justify-center">
            <View className="mb-6">
              {data?.goal ? (
                <View className="mb-6 items-center">
                  <Text className="text-sm text-[#323232] dark:text-gray-400 font-normal text-center">
                    OBJETIVO
                  </Text>
                  <Text className="text-lg font-semibold dark:text-white text-center">
                    {data?.goal}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="mb-6 item">
              <Text className="text-sm text-[#323232] dark:text-gray-400 font-normal">
                PESO ATUAL (KG)
              </Text>
              <Text className="text-lg font-semibold dark:text-white">
                {data?.weight ?? 0}
              </Text>
            </View>

            <View className="mb-6 items-end">
              <Text className="text-sm text-[#323232] dark:text-gray-400 font-normal">
                ALTURA (M)
              </Text>
              <Text className="text-lg font-semibold dark:text-white">
                {data?.height ?? 0}
              </Text>
            </View>
          </View>

          {data?.weight && data?.height ? (
            <View className="flex-row justify-between">
              <View className="mb-4">
                <Text className="text-sm text-[#323232] dark:text-gray-400 font-normal">
                  IMC
                </Text>
                <Text className="text-lg font-semibold dark:text-white">
                  {calculateIMC()}
                </Text>
              </View>
              <View className="mb-4 items-end">
                <Text className="text-sm text-[#323232] dark:text-gray-400 font-normal">
                  CLASSIFICAÇÃO
                </Text>
                <Text className="text-lg font-semibold dark:text-white">
                  {getIMCClassification()}
                </Text>
              </View>
            </View>
          ) : null}

          <View className="flex w-full mt-6">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="bg-[#323232] dark:bg-gray-700 items-center py-4 rounded-[8]"
            >
              <Text className="text-white text-base font-black">
                EDITAR PERFIL
              </Text>
            </TouchableOpacity>
          </View>

          <EditProfileModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
            goal={goal}
            setGoal={setGoal}
            avatar={avatar}
            setAvatar={setAvatar}
            pickImage={pickImage}
            onSave={handleSave}
            isDark={isDark}
          />
        </View>
      </View>
    </View>
  );
}
