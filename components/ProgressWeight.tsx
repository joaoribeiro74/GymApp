import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { weightStats } from "../mocks/data";
import useAuth from "../firebase/hooks/useAuth";
import useDocument from "../firebase/hooks/useDocument";
import User from "../types/User";
import { useTheme } from "../context/ThemeContext";


type ChartTooltipItem = {
  value: number;
  label?: string;
  frontColor?: string;
};

export default function ProgressWeight() {
  const { user } = useAuth();
  const { data } = useDocument<User>("users", user?.uid ?? "");
  const { isDark } = useTheme();

  const weightStats = useMemo(() => {
    if (!data?.weightHistory) return [];
    return [...data.weightHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [data]);

  if (weightStats.length === 0) {
    return (
      <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm shadow-black items-center justify-center mb-4">
        <Text className="text-sm font-bold text-[#323232] dark:text-white mb-2">
          Nenhum peso registrado ainda.
        </Text>
        <Text className="text-xs text-[#666] dark:text-gray-400 font-normal text-center mb-2">
          Registre seu peso corporal na tela de perfil para acompanhar sua evolução aqui!
        </Text>
      </View>
    );
  }

  const maxValue = Math.max(...weightStats.map((item) => item.weight));

  const chartData = weightStats.map((item) => ({
    value: item.weight,
    label: new Date(item.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
    frontColor: item.weight === maxValue ? "#1DAA2D" : isDark ? "#d9d9d9" : "#323232",
  }));
  const stepSize = 20;
  const adjustedMaxValue = Math.ceil(maxValue / stepSize) * stepSize;
  const numberOfSections = adjustedMaxValue / stepSize;

  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setMonth(startDate.getMonth() - 3);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", {
      month: "long",
      day: "numeric",
    });

  const dateRange = `${formatDate(startDate)} - ${formatDate(
    currentDate
  )}`.toUpperCase();

  return (
    <View
      className="bg-white dark:bg-gray-800 rounded-[10] p-4 mb-8 shadow-sm shadow-black"
    >
      <Text className="text-left font-bold text-[#7B7B7B] dark:text-gray-400 text-sm mb-1">
        {dateRange}
      </Text>
      <Text className="text-left font-bold text-[#323232] dark:text-white text-lg mb-4">
        PESO CORPORAL
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          data={chartData}
          barWidth={30}
          barBorderRadius={4}
          yAxisThickness={1}
          yAxisColor={"#E5E5E5"}
          xAxisThickness={1}
          xAxisColor="#E5E5E5"
          yAxisTextStyle={{ color: isDark ? "#d9d9d9" : "#323232", fontSize: 12 }}
          xAxisLabelTextStyle={{ color: isDark ? "#d9d9d9" : "#323232", fontSize: 10 }}
          initialSpacing={20}
          spacing={25}
          maxValue={adjustedMaxValue}
          noOfSections={numberOfSections}
          stepHeight={40}
          isAnimated
          activeOpacity={0.9}
          width={Math.max(chartData.length * 55 + 40, 300)}
          renderTooltip={(item: ChartTooltipItem) => {
            const isMax = item.value === maxValue;

            return (
              <Text
                style={{
                  color: isMax ? "#1DAA2D" : isDark ? "#ffffff" : "#323232",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                {item.value}KG
              </Text>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
