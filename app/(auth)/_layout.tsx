import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import CustomDrawerContent from '../../components/CustomDrawer'

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              width: 280,
            },
          }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: 'Início',
            title: 'INÍCIO',
          }}
        />

        <Drawer.Screen name="workouts" options={{ title: "Treinos" }} />
        <Drawer.Screen name="progress" options={{ title: "Progresso" }} />
        <Drawer.Screen name="activity" options={{ title: "Atividade" }} />
        <Drawer.Screen name="settings" options={{ title: "Configurações" }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}

