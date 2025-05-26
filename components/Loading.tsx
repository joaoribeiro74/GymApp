import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator className="text-[#323232]" />
    </View>
  );
}
