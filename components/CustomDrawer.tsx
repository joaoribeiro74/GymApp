import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import useAuth from "../firebase/hooks/useAuth";
import useDocument from "../firebase/hooks/useDocument";
import User from "../types/User";
type Props = {
  navigation: any;
  state: any;
};
export default function CustomDrawerContent({ navigation, state }: Props) {
  const { user } = useAuth();
  const { data } = useDocument<User>("users", user?.uid ?? "");
  const avatarUri = "";
  const { logout } = useAuth();

  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const drawerItems = [
    {
      icon: <Ionicons name="home" size={20} color="#323232" />,
      label: "Início",
      route: "index",
    },
    {
      icon: <Ionicons name="fitness" size={20} color="#323232" />,
      label: "Treinos",
      route: "workouts/home",
    },
    {
      icon: <AntDesign name="pluscircle" size={20} color="#323232" />,
      label: "Criar Treino",
      route: "workouts/create",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="clock-time-eight"
          size={20}
          color="#323232"
        />
      ),
      label: "Progresso",
      route: "progress/home",
    },
    {
      icon: <AntDesign name="areachart" size={20} color="#323232" />,
      label: "Atividade",
      route: "activity/home",
    },
  ];

  return (
    <View className="flex-1 bg-white justify-between">
      <View className="pt-4">
        <View className="items-start pt-8 pb-4 px-4">
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              className="w-[60px] h-[60px] rounded-full"
            />
          ) : (
            <View className="w-[60px] h-[60px] rounded-full items-center justify-center">
              <FontAwesome name="user-circle-o" size={60} color="#323232" />
            </View>
          )}
          <Text className="mt-3 mb-2 text-xl font-bold text-[#323232]">
            {data?.username.toUpperCase()}
          </Text>
        </View>

        <View className="border-t border-[#323232] opacity-25" />

        <View className="py-4">
          {drawerItems.map((item, index) => {
            const isActive = state.index === index;
            return (
              <TouchableOpacity
                key={item.route}
                className={`flex-row items-center px-4 py-4 ${
                  isActive ? "bg-[#f6f6f6]" : ""
                }`}
                onPress={() => navigateTo(item.route)}
              >
                {item.icon}
                <Text className="ml-4 text-base font-bold text-[#323232]">
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="border-t border-[#323232] opacity-25" />

        <View className="py-4">
          <TouchableOpacity
            className={`flex-row items-center px-4 py-4 ${
              state.routeNames[state.index] === "settings" ? "bg-[#f6f6f6]" : ""
            }`}
            onPress={() => navigateTo("settings/home")}
          >
            <Ionicons name="settings-sharp" size={20} color="#323232" />
            <Text className="ml-4 text-base font-bold text-[#323232]">
              Configurações
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="flex-row items-center px-4 pb-16"
        onPress={async () => {
          try {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "login" }],
            });
          } catch (error: any) {
            Alert.alert("Logout Error", error.toString());
          }
        }}
      >
        <SimpleLineIcons name="logout" size={20} color="#CD1C18" />
        <Text className="ml-4 text-base font-bold text-[#CD1C18]">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
