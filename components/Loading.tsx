import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center dark:bg-gray-900">
      <ActivityIndicator className="text-[#323232] dark:text-white" />
    </View>
  );
}
