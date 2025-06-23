import { Image } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/CustomDrawer";

export default function AuthLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            width: 280,
          },
          headerRight: () => (
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 40, height: 40, marginRight: 16 }}
              resizeMode="contain"
            />
          )
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
            title: "TREINOS" 
            }} 
        />
        <Drawer.Screen
          name="workouts/create"
          options={{ 
            title: "CRIAR TREINO" 
          }}
        />
        <Drawer.Screen 
          name="progress/home" 
          options={{ 
            title: "PROGRESSO" }} 
        />
        <Drawer.Screen 
          name="activity/home" 
          options={{ title: "ATIVIDADE" 

          }} 
        />
        <Drawer.Screen
          name="settings/home"
          options={{ 
            title: "CONFIGURAÇÕES" 
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
