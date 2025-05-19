import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

export default function register() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

  return (
    <View className='bg-[#d9d9d9] h-full'>
                <View className='m-8'>
                    <Text className='text-sm font-bold text-[#323232] mt-8 text-left'>E-MAIL</Text>
                    <TextInput className='bg-white rounded-[8] px-4 py-4 mt-2 shadow'
                        style={{
                        shadowColor: '#000',
                        shadowOffset : { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5}}
                    />
                    <Text className='text-sm font-bold text-[#323232] mt-8 text-left'>NOME DE USUÁRIO</Text>
                    <TextInput className='bg-white rounded-[8] px-4 py-4 mt-2 shadow'
                        style={{
                        shadowColor: '#000',
                        shadowOffset : { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5}}
                    />
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
                    <Text className='text-sm font-bold text-[#323232] mt-8 text-left'>CONFIRME SUA SENHA</Text>
                    <TextInput className='bg-white rounded-[8] px-4 py-4 mt-2 shadow'
                        style={{
                        shadowColor: '#000',
                        shadowOffset : { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5}}
                        
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder=""
                        secureTextEntry={true}
                    />   
    
                    <TouchableOpacity className='bg-[#323232] mx-auto px-20 py-4 rounded-[8] mt-12' onPress={() => router.push('/login')}>
                        <Text className='text-white text-center font-bold'>REGISTRAR</Text>
                    </TouchableOpacity>
                    <View className='mt-2 flex-row items-center justify-center'>
                        <Text className='text-xs text-[#323232] font-bold'>
                            Você já tem uma conta?
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/register')}>
                                <Text className='ml-1 text-xs underline font-black text-[#323232] items-center'>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
  )
}