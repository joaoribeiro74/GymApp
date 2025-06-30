import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";

import "../global.css";
import toastConfig from "../components/CustomToast";
import ThemeProvider, { useTheme } from "../theme/ThemeContext";

// Componente que consome o tema
function AppLayout() {
  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "#121212" : "#FFFFFF";
  const statusBarStyle = theme === "dark" ? "light" : "dark";

  return (
    <View className={theme === "dark" ? "dark flex-1" : "flex-1"}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: backgroundColor,
            statusBarStyle: statusBarStyle,
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: backgroundColor,
            statusBarStyle: statusBarStyle,
          }}
        />

        <Stack.Screen
          name="register"
          options={{
            title: "CADASTRO",
            statusBarHidden: false,
            statusBarBackgroundColor: backgroundColor,
            statusBarStyle: statusBarStyle,
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: theme === "dark" ? "#fff" : "#323232",
              fontWeight: "bold",
              fontSize: 18,
            },
          }}
        />

        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            statusBarBackgroundColor: backgroundColor,
            statusBarStyle: statusBarStyle,
          }}
        />
      </Stack>

      <Toast config={toastConfig} />
    </View>
  );
}

// Envolve com o ThemeProvider
export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}
