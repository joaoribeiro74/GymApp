import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../../components/SearchInput'

export default function create() {
    const [search, setSearch] = useState("");

  return (
    <SafeAreaView>
        <View className="px-4 pb-4">
            <Text className="text-md font-bold text-[#323232]">BUSCAR EXERCÍCIOS</Text>
            <SearchInput value={search} onChangeText={setSearch} />
        </View>
    </SafeAreaView>
  )
}