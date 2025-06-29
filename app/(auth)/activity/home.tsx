import { View, Text, ScrollView, Alert } from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutHistoryCard from "../../../components/WorkoutHistoryCard";
import useUserWorkouts, { WorkoutLog } from "../../../hooks/useUserWorkouts";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";

type CalendarDay = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";

function filterLast30Days(logs: WorkoutLog[]) {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return logs
    .filter((log) => log.date >= thirtyDaysAgo && log.date <= today)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function getMarkedDates(logs: WorkoutLog[]) {
  const marks: Record<string, any> = {};
  logs.forEach((log) => {
    const date = new Date(log.date);
    const key = date.toISOString().split("T")[0];
    marks[key] = {
      selected: true,
      selectedColor: "#323232",
      marked: true,
      dotColor: "#fff",
      textColor: "#fff",
    };
  });
  return marks;
}

function getCurrentMonthLogs(logs: WorkoutLog[]) {
  const now = new Date();
  return logs.filter((log) => {
    const d = new Date(log.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
}

function getWeeklyAverage(logs: WorkoutLog[]) {
  if (logs.length === 0) return 0;

  const first = logs.reduce(
    (min, l) => (l.date < min ? l.date : min),
    logs[0].date
  );
  const last = logs.reduce(
    (max, l) => (l.date > max ? l.date : max),
    logs[0].date
  );

  const days = (last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
  const weeks = Math.max(days / 7, 1); 

  return (logs.length / weeks).toFixed(1);
}
export default function HomeActivity() {
  const { workoutLogs, loading } = useUserWorkouts();
  const last30DaysLogs = filterLast30Days(workoutLogs);
  const [currentMonth, setCurrentMonth] = useState("2025-06");  

  const markedDates = useMemo(() => getMarkedDates(workoutLogs), [workoutLogs]);
  const currentMonthLogs = useMemo(
    () => getCurrentMonthLogs(workoutLogs),
    [workoutLogs]
  );
  const average = useMemo(
    () => getWeeklyAverage(currentMonthLogs),
    [currentMonthLogs]
  );

  if (loading) return <Loading />;

  function handleDayPress(day: CalendarDay) {
    const hasWorkout = workoutLogs.some(
      (log) => log.date.toISOString().split("T")[0] === day.dateString
    );

    const [year, month, dayPart] = day.dateString.split("-");
    const formattedDate = `${dayPart}-${month}-${year}`;

    if (hasWorkout) {
      Alert.alert("Dia de treino", `Você treinou em ${formattedDate}.`);
    } else {
      Alert.alert(
        "Sem treino",
        `Nenhum treino registrado em ${formattedDate}.`
      );
    }
  }

  return (
    <SafeAreaView className="flex-1">
      {last30DaysLogs.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <View className="bg-white p-4 rounded-xl shadow-sm shadow-black items-center justify-center mx-4">
            <Text className="text-center text-md text-[#323232] font-bold mt-4 mb-2">
              Nenhum treino nos últimos 30 dias.
            </Text>
            <Text className="text-xs text-[#666] text-center mb-4">
              Crie e faça um treino para ver ele aqui!
            </Text>
            <StyledButton
              variant="default"
              title="CRIAR TREINO"
              onPress={() => router.push("/(auth)/workouts/create")}
            >
              <View className="flex-row items-center justify-center space-x-2">
                <Text className="text-white text-center font-bold">
                  CRIAR TREINO
                </Text>
              </View>
            </StyledButton>
          </View>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4 pb-4">
            <Text className="text-md font-black mb-2">TREINOS FEITOS</Text>
            {/* Calendário com dias marcados */}
            <Calendar
              onMonthChange={(month) =>
                setCurrentMonth(month.dateString.substring(0, 7))
              }
              markedDates={markedDates}
              onDayPress={handleDayPress}
              hideExtraDays
              minDate={"2025-06-01"}
              theme={{
                selectedDayBackgroundColor: "#1DAA2D",
                todayTextColor: "#1DAA2D",
                arrowColor: "#323232",
                monthTextColor: "#000",
                dayTextColor: "#000",
                textDayFontWeight: "700",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "700",
              }}
              style={{
                borderRadius: 8,
                marginBottom: 16,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,
                elevation: 1,
              }}
            />

            <Text className="text-md font-black mt-4 mb-2">ATIVIDADE DO MÊS</Text>
            <View className="bg-white p-4 rounded-xl shadow-sm shadow-black mb-4">
              <View className="flex-row items-center gap-2 mb-4">
                <FontAwesome6 name="dumbbell" size={16} color="#323232" />
                <Text className="text-sm text-black font-black">
                  TREINOS: {currentMonthLogs.length}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <FontAwesome6 name="chart-column" size={20} color="#323232" />
                <Text className="text-sm text-black font-black">
                  MÉDIA POR SEMANA: {average}
                </Text>
              </View>
            </View>

            <Text className="text-md font-black mt-4 mb-2">
              HISTÓRICO DE TREINOS (ÚLTIMOS 30 DIAS)
            </Text>
            <View>
              {last30DaysLogs.map((log) => (
                <WorkoutHistoryCard key={log.id} log={log} />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
