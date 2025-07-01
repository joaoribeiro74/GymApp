import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";

import "../global.css";
import toastConfig from "../components/CustomToast";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function AppContent() {
  const { theme } = useTheme();

  // Constantes para classes e cores do tema
  const bgClass = theme === "dark" ? "#1f2937" : "#ffffff";
  const statusBarBgColor = theme === "dark" ? "gray-800" : "white"; // bg-gray-800 hex
  const statusBarStyle = theme === "dark" ? "light" : "dark";
  const headerTitleColor = theme === "dark" ? "white" : "#323232";
  const headerTintColor = theme === "dark" ? "white" : "#323232";

  return (
    <View className={`${bgClass} flex-1`}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: statusBarBgColor,
            statusBarStyle: statusBarStyle,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: statusBarBgColor,
            statusBarStyle: statusBarStyle,
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          options={{
            title: "RECUPERAR SENHA",
            statusBarHidden: false,
            statusBarBackgroundColor: statusBarBgColor,
            statusBarStyle: statusBarStyle,
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: headerTitleColor,
              fontWeight: "bold",
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: bgClass,
            },
            headerTintColor: headerTintColor,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "CADASTRO",
            statusBarHidden: false,
            statusBarBackgroundColor: statusBarBgColor,
            statusBarStyle: statusBarStyle,
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: headerTitleColor,
              fontWeight: "bold",
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: bgClass,
            },
            headerTintColor: headerTintColor,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            statusBarBackgroundColor: statusBarBgColor,
            statusBarStyle: statusBarStyle,
          }}
        />
      </Stack>

      <Toast config={toastConfig} />
    </View>
  );
}

export default function AppLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
