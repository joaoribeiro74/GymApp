import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useDocument from "../../../firebase/hooks/useDocument";
import useAuth from "../../../firebase/hooks/useAuth";
import User from "../../../types/User";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import toastConfig from "../../../components/CustomToast";
import MaskInput from "react-native-mask-input";

export default function home() {
  const { user } = useAuth();
  const { data, upsert } = useDocument<User>("users", user?.uid ?? "");
  const [modalVisible, setModalVisible] = useState(false);

  const [weight, setWeight] = useState(data?.weight?.toString() ?? "");
  const [height, setHeight] = useState(data?.height?.toString() ?? "");
  const [goal, setGoal] = useState(data?.goal ?? "");

  const avatarUri = "";

  React.useEffect(() => {
    if (modalVisible && data) {
      setWeight(data.weight?.toString() ?? "");
      setHeight(data.height?.toString() ?? "");
      setGoal(data.goal ?? "");
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

    const heightPattern = /^\d+\.\d{2}$/;
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

    if (goalUnchanged && weightUnchanged && heightUnchanged) {
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

    const newEntry = {
      date: new Date().toISOString(),
      weight: newWeight,
    };

    const { id, ...cleanedData } = data;

    const lastWeight = data?.weight;
    const weightHistory = [...(data?.weightHistory ?? [])];

    if (lastWeight !== newWeight) {
      weightHistory.push(newEntry);
    }

    await upsert({
      ...cleanedData,
      weight: newWeight,
      height: newHeight,
      goal,
      weightHistory,
    });

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
    const imc = parseFloat(calculateIMC()); // ✅ garante tipo number
    if (isNaN(imc)) return "-";

    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 24.9) return "Peso normal";
    if (imc < 29.9) return "Sobrepeso";
    if (imc < 34.9) return "Obesidade I";
    if (imc < 39.9) return "Obesidade II";
    return "Obesidade III";
  };

  return (
    <View className="bg-white rounded-b-[30] shadow-md shadow-black px-8 pt-8 pb-8">
      <View className="items-center flex-row gap-4 justify-center">
        {avatarUri ? (
          <Image
            source={{ uri: avatarUri }}
            className="w-[60px] h-[60px] rounded-full"
          />
        ) : (
          <View className="w-[60px] h-[60px] rounded-full">
            <FontAwesome name="user-circle-o" size={60} color="#323232" />
          </View>
        )}
        <View>
          <Text className="text-xl font-bold text-[#323232]">
            {data?.username?.toUpperCase()}
          </Text>
          <Text className="text-sm text-[#323232] font-normal">
            {user?.email}
          </Text>
        </View>
      </View>

      <View className="mt-8 flex w-full">
        <View className="flex-row justify-center">
          <View className="mb-6">
            {data?.goal ? (
              <View className="mb-6 items-center">
                <Text className="text-sm text-[#323232] font-normal text-center">
                  OBJETIVO
                </Text>
                <Text className="text-lg font-semibold text-center">
                  {data?.goal}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="mb-6 item">
            <Text className="text-sm text-[#323232] font-normal">
              PESO ATUAL (KG)
            </Text>
            <Text className="text-lg font-semibold">{data?.weight ?? 0}</Text>
          </View>

          <View className="mb-6 items-end">
            <Text className="text-sm text-[#323232] font-normal">
              ALTURA (M)
            </Text>
            <Text className="text-lg font-semibold">{data?.height ?? 0}</Text>
          </View>
        </View>

        {data?.weight && data?.height ? (
          <View className="flex-row justify-between">
            <View className="mb-4">
              <Text className="text-sm text-[#323232] font-normal">IMC</Text>
              <Text className="text-lg font-semibold">{calculateIMC()}</Text>
            </View>
            <View className="mb-4 items-end">
              <Text className="text-sm text-[#323232] font-normal">
                CLASSIFICAÇÃO
              </Text>
              <Text className="text-lg font-semibold">
                {getIMCClassification()}
              </Text>
            </View>
          </View>
        ) : null}

        <View className="flex w-full mt-6">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-[#323232] items-center py-4 rounded-[8]"
          >
            <Text className="text-white text-base font-black">
              EDITAR PERFIL
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView className="flex-1 bg-white px-4">
            <View className="flex-row items-center justify-between pt-4 pb-2">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="chevron-down" size={30} color="#323232" />
              </TouchableOpacity>
              <Text className="text-lg font-black text-[#323232] text-center flex-1">
                EDITAR PERFIL
              </Text>
              <View style={{ width: 30 }}>
                <Text> </Text>
              </View>
            </View>
            <View className="pt-6 pb-2">
              <Text className="text-sm font-bold text-[#323232]">
                OBJETIVO (Opcional)
              </Text>
              <TextInput
                value={goal}
                onChangeText={setGoal}
                cursorColor={"#323232"}
                placeholder="Ex: Ganhar massa, Perder peso"
                className="bg-[#f6f6f6] rounded-[8] px-4 py-3 mt-1 mb-4 shadow-sm shadow-black"
              />
            </View>
            <View className="pt-2 pb-2">
              <Text className="text-sm font-bold text-[#323232]">
                PESO (KG)
              </Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                cursorColor={"#323232"}
                keyboardType="numeric"
                className="bg-[#f6f6f6] rounded-[8] px-4 py-3 mt-1 mb-4 shadow-sm shadow-black"
              />
            </View>
            <View className="pt-2 pb-2">
              <Text className="text-sm font-bold text-[#323232]">
                ALTURA (M)
              </Text>
              <MaskInput
                mask={[/\d/, ".", /\d/, /\d/]}
                value={height}
                onChangeText={setHeight}
                cursorColor={"#323232"}
                keyboardType="numeric"
                placeholder="Ex: 1.75"
                className="bg-[#f6f6f6] rounded-[8] px-4 py-3 mt-1 mb-6 shadow-sm shadow-black"
              />
            </View>
            <View className="flex-1 py-4 justify-end">
              <TouchableOpacity
                onPress={handleSave}
                className="bg-[#323232] px-6 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-black">SALVAR</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <Toast config={toastConfig} />
        </Modal>
      </View>
    </View>
  );
}
