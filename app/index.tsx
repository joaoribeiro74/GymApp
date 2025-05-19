import React, { useEffect } from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar';
import { useRouter } from 'expo-router';

export default function index() {
  useEffect(() => {
  NavigationBar.setBackgroundColorAsync('#d9d9d9');
  }, []);
  
  const router = useRouter();


  return (
    <View className='bg-[#d9d9d9] h-full'>
        <View className='bg-white h-1/2 items-center justify-center rounded-b-[50] shadow'
        style={{
            shadowColor: '#000',
            shadowOffset : { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5}}>
            <Image source={require('../assets/logo.png')} className=''/>
        </View>
        <View className='items-center justify-center mt-12 px-8'>
            <Text className='text-2xl font-bold text-[#323232] text-center mb-8'>TENHA CONTROLE SOBRE SEU TREINO</Text>
            <Text className='text-sm font-bold text-[#323232] text-center mb-8'>Gerencie seus treinos, acompanhe sua evolução e mantenha a motivação.
Crie treinos personalizados e visualize seu progresso de forma simples e prática.</Text>
        </View>
        <TouchableOpacity className='bg-[#323232] w-1/2 mx-auto px-4 py-4 rounded-[8] mt-4' onPress={() => router.push('/login')}>
            <Text className='text-white text-center font-bold'>COMECE AGORA</Text>
        </TouchableOpacity>
    </View>
  )
}
