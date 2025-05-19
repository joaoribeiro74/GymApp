import { View, Text } from 'react-native'
import React from 'react'
import useNavigationExitOnBack from '../../hooks/useNavigationExitOnBack';

import { data } from '../../mocks/data';

export default function home() {
    useNavigationExitOnBack();

  return (
    <View>
      <Text>home</Text>

      {data.map((allWorkout, index) => (
        <Text key={index}>
            Nome: {allWorkout.name}
        </Text>
      ))}
    </View>
  )
}