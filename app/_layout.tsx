import React, { useEffect } from 'react'
import { Stack } from "expo-router"

import "../global.css"

export default function _layout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, statusBarHidden: false, statusBarBackgroundColor: "white", statusBarStyle: "dark" }} />
        <Stack.Screen name='login' options={{ headerShown: false, statusBarHidden: false, statusBarBackgroundColor: "white", statusBarStyle: "dark" }} />
        <Stack.Screen name='register' options={{ title: "CADASTRO", statusBarHidden: false, statusBarBackgroundColor: "white", statusBarStyle: "dark", headerTitleAlign: "center", headerTitleStyle: {
          color: "#323232",
          fontWeight: "bold",
          fontSize: 18,
        } }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false, statusBarBackgroundColor: "white", statusBarStyle: "dark" }} />    
      </Stack>
  );
}
