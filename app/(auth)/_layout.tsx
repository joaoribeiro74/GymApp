import { Image } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/CustomDrawer";
import { useTheme } from "../../context/ThemeContext";

export default function AuthLayout() {
  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "#1f2937" : "#ffffff";
  const headerTextColor = theme === "dark" ? "#ffffff" : "#1f2937"; 
  const drawerLabelColor = theme === "dark" ? "#f9fafb" : "#111827";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: backgroundColor,
            width: 280,
          },
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTitleStyle: {
            color: headerTextColor,
            fontWeight: "bold",
            fontSize: 18,
          },
          headerTintColor: headerTextColor,
          headerRight: () => (
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 40, height: 40, marginRight: 16 }}
              resizeMode="contain"
            />
          ),
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "INÍCIO",
          }}
        />

        <Drawer.Screen
          name="workouts/home"
          options={{
            title: "TREINOS",
          }}
        />
        <Drawer.Screen
          name="workouts/create"
          options={{
            title: "CRIAR TREINO",
          }}
        />
        <Drawer.Screen
          name="progress/home"
          options={{
            title: "PROGRESSO",
          }}
        />
        <Drawer.Screen name="activity/home" options={{ title: "ATIVIDADE" }} />
        <Drawer.Screen
          name="settings/home"
          options={{
            title: "CONFIGURAÇÕES",
            headerShadowVisible: false,
          }}
        />
        <Drawer.Screen
          name="workouts/nextWorkout"
          options={{
            title: "PRÓXIMO TREINO",
          }}
        />
        <Drawer.Screen
          name="workouts/[id]/edit"
          options={{
            title: "EDITAR TREINO",
          }}
        />
        <Drawer.Screen
          name="progress/allRecords"
          options={{
            title: "TODOS OS RECORDES",
          }}
        />
        <Drawer.Screen
          name="profile/home"
          options={{
            title: "PERFIL",
            headerShadowVisible: false,
          }}
        />
        <Drawer.Screen
          name="activity/[id]/workoutDetails"
          options={{
            title: "DETALHES DO TREINO",
          }}
        />
        <Drawer.Screen
          name="settings/editUsername"
          options={{
            title: "NOME DE USUÁRIO",
          }}
        />
        <Drawer.Screen
          name="settings/resetPassword"
          options={{
            title: "SENHA",
          }}
        />
        <Drawer.Screen
          name="settings/themeSettings"
          options={{
            title: "TEMA",
            headerShadowVisible: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
