import React from "react";
import { View, Text, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { weightStats } from "../mocks/data";

type ChartTooltipItem = {
  value: number;
  label?: string;
  frontColor?: string;
};

export default function ProgressWeight() {
  const maxValue = Math.max(...weightStats.map((item) => item.weight));

  const chartData = weightStats.map((item) => ({
    value: item.weight,
    label: item.description,
    frontColor: item.weight === maxValue ? "#1DAA2D" : "#323232",
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
      className="bg-white rounded-[10] p-4 mb-8"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text className="text-left font-bold text-[#7B7B7B] text-sm mb-1">
        {dateRange}
      </Text>
      <Text className="text-left font-bold text-[#323232] text-lg mb-4">
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
          xAxisLabelTextStyle={{ color: "#323232", fontSize: 10 }}
          initialSpacing={20}
          spacing={25}
          maxValue={adjustedMaxValue}
          noOfSections={numberOfSections}
          stepHeight={40}
          isAnimated
          activeOpacity={0.9}
          renderTooltip={(item: ChartTooltipItem) => {
            const maxValue = Math.max(...chartData.map((d) => d.value));
            const isMax = item.value === maxValue;

            return (
              <Text
                style={{
                  color: isMax ? "#1DAA2D" : "#323232",
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
