import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';

export default function login() {
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const router = useRouter();

  return (
    <View className='bg-[#d9d9d9] h-full'>
            <View className='bg-white h-1/3 items-center justify-center rounded-b-[30] shadow'
            style={{
                shadowColor: '#000',
                shadowOffset : { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5}}>
                <Image source={require('../assets/logo.png')} className='h-[100] w-[100]'/>
            </View>

            <View className='m-8'>
                <Text className='text-sm font-bold text-[#323232] mt-8 text-left'>E-MAIL OU NOME DE USUÁRIO</Text>
                <TextInput className='bg-white rounded-[8] px-4 py-4 mt-2 shadow'
                    style={{
                    shadowColor: '#000',
                    shadowOffset : { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5}}>
                </TextInput>
                <Text className='text-sm font-bold text-[#323232] mt-8 text-left'>SENHA</Text>
                <TextInput className='bg-white rounded-[8] px-4 py-4 mt-2 shadow'
                    style={{
                    shadowColor: '#000',
                    shadowOffset : { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5}}
                    
                    value={password}
                    onChangeText={setPassword}
                    placeholder=""
                    secureTextEntry={true}
                />    
                <TouchableOpacity>
                    <Text className='text-xs font-black text-[#323232] mt-2 text-right underline'>ESQUECEU A SENHA?</Text>
                </TouchableOpacity>

                <View className='flex-row items-center'>
                    <Checkbox
                        className='bg-white shadow p-[10]'
                        style={{
                            borderColor: isChecked ? '#323232' : '#fff',
                            borderRadius: 6,
                            shadowColor: '#000',
                            shadowOffset : { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5
                        }}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#323232' : undefined}
                    />
                    <Text className='ml-2 text-xs text-[#323232] underline font-bold'>Lembre-se de mim</Text>
                </View>

                <TouchableOpacity className='bg-[#323232] mx-auto px-20 py-4 rounded-[8] mt-8' onPress={() => router.push('/(auth)/home')}>
                    <Text className='text-white text-center font-bold'>LOGIN</Text>
                </TouchableOpacity>
                <View className='mt-2 flex-row items-center justify-center'>
                    <Text className='text-xs text-[#323232] font-bold'>
                        Não tem Login?
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/register')}>
                            <Text className='ml-1 text-xs underline font-black text-[#323232] items-center'>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
}