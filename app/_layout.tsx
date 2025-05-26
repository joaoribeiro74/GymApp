import React from "react";
import { Stack } from "expo-router";

import "../global.css";
import Toast from "react-native-toast-message";
import toastConfig from "../components/CustomToast";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: "white",
            statusBarStyle: "dark",
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            statusBarHidden: false,
            statusBarBackgroundColor: "white",
            statusBarStyle: "dark",
          }}
        />

        <Stack.Screen
          name="register"
          options={{
            title: "CADASTRO",
            statusBarHidden: false,
            statusBarBackgroundColor: "white",
            statusBarStyle: "dark",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#323232",
              fontWeight: "bold",
              fontSize: 18,
            },
          }}
        />

        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            statusBarBackgroundColor: "white",
            statusBarStyle: "dark",
          }}
        />
      </Stack>

      <Toast config={toastConfig} />
    </>
  );
}
