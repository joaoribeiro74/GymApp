import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
type Props = {
    navigation: any;
    state: any;
};
export default function CustomDrawerContent({navigation, state}: Props) {
    const userName = "João Vitor";
    const avatarUri = "";

    const navigateTo = (screenName: string) => {
        navigation.navigate(screenName);
    }

     const drawerItems = [
    {
      icon: <Ionicons name="home" size={20} color="#323232" />,
      label: 'Início',
      route: 'home',
    },
    {
      icon: <Ionicons name="fitness" size={20} color="#323232" />,
      label: 'Treinos',
      route: 'workouts',
    },
    {
      icon: <MaterialCommunityIcons name="clock-time-eight" size={20} color="#323232" />,
      label: 'Progresso',
      route: 'progress',
    },
    {
      icon: <AntDesign name="areachart" size={20} color="#323232" />,
      label: 'Atividade',
      route: 'activity',
    },
  ];
  
    return (
        <View className='flex-1 bg-white justify-between'>
          <View>
            <View className='items-start pt-8 pb-4 px-4'>
              {avatarUri ? (
                <Image 
                  source={{ uri: avatarUri }}
                  className='w-[60px] h-[60px] rounded-full'
                />
              ) : (
                <View className="w-[60px] h-[60px] rounded-full items-center justify-center">
                  <FontAwesome name="user-circle-o" size={60} color="#323232" />
                </View>
              )}
              <Text className='mt-3 mb-2 text-xl font-bold text-[#323232]'>{userName}</Text>
            </View>

            <View className="border-t border-[#323232] opacity-25" />

            <View className="py-4">
              {drawerItems.map((item, index) => {
                const isActive = state.index === index;
                return (
                  <TouchableOpacity
                    key={item.route}
                    className={`flex-row items-center px-4 py-4 ${
                      isActive ? 'bg-[#f6f6f6]' : ''
                    }`}
                    onPress={() => navigateTo(item.route)}
                  >
                    {item.icon}
                    <Text className="ml-4 text-base font-bold text-[#323232]">{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="border-t border-[#323232] opacity-25" />

            <View className="py-4">
              <TouchableOpacity
                className={`flex-row items-center px-4 py-4 ${
                  state.routeNames[state.index] === 'settings' ? 'bg-[#f6f6f6]' : ''
                }`}
                onPress={() => navigateTo('settings')}
              >
                <Ionicons name="settings-sharp" size={20} color="#323232" />
                <Text className="ml-4 text-base font-bold text-[#323232]">Configurações</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="flex-row items-center px-4 pb-8"
            onPress={() => {
              console.log("Logout");
              navigation.navigate("login");
            }}
          >
            <SimpleLineIcons name="logout" size={20} color="#CD1C18" />
            <Text className="ml-4 text-base font-bold text-[#CD1C18]">Logout</Text>
          </TouchableOpacity>
        </View>
    );
}
