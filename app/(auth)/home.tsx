import { View, Text } from 'react-native'
import React from 'react'
import useNavigationExitOnBack from '../../hooks/useNavigationExitOnBack';

import { data } from '../../mocks/data';
import TodayWorkout from '../../components/TodayWorkout';
import ProgressWeight from '../../components/ProgressWeight';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
    useNavigationExitOnBack();

  return (
    <ScrollView>
      <View className='p-4'>
        {data.map((allWorkout, index) => (
          <Text key={index}
            className='text-2xl font-bold text-[#323232]'
          >
            OLÁ, {allWorkout.name.toUpperCase()}
          </Text>
        ))}
          <Text className='text-md font-bold text-[#323232] mb-6'>O QUE VOCÊ GOSTARIA DE FAZER HOJE?</Text>

          <TodayWorkout />

          <Text className='text-4xl font-bold text-[#323232] mt-8 mb-4'>PROGRESSO</Text>

          <ProgressWeight/>
      </View>
    </ScrollView>
  )
}