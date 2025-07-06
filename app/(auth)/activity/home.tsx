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
import { getAuth } from "firebase/auth";
import { useTheme } from "../../../context/ThemeContext";

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

function formatDateToLocalISO(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatYearMonth(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}

function getMarkedDates(logs: WorkoutLog[], isDark: boolean) {
  const marks: Record<string, any> = {};
  logs.forEach((log) => {
    const date = new Date(log.date);
    const key = formatDateToLocalISO(date);
    marks[key] = {
      selected: true,
      selectedColor: isDark ? "#4ADE80" : "#323232",
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
  const auth = getAuth();
  const { workoutLogs, loading } = useUserWorkouts();
  const last30DaysLogs = filterLast30Days(workoutLogs);
  const [currentMonth, setCurrentMonth] = useState<string>(
    formatYearMonth(new Date())
  );
  const creationTime = auth.currentUser?.metadata?.creationTime;
  const creationDate = creationTime ? new Date(creationTime) : null;
  const { isDark } = useTheme();

  const markedDates = useMemo(() => getMarkedDates(workoutLogs, isDark), [workoutLogs, isDark]);
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
      (log) => formatDateToLocalISO(log.date) === day.dateString
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
    <SafeAreaView className="flex-1 dark:bg-gray-900">
      {last30DaysLogs.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm shadow-black items-center justify-center mx-4">
            <Text className="text-center text-md text-[#323232] dark:text-white font-bold mt-4 mb-2">
              Nenhum treino nos últimos 30 dias.
            </Text>
            <Text className="text-xs text-[#666] dark:text-gray-400 text-center mb-4">
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
            <Text className="text-md font-black mb-2 dark:text-white">
              TREINOS FEITOS
            </Text>
            {/* Calendário com dias marcados */}
            <Calendar
              key={isDark ? "dark" : "light"} // 🔑 força remontagem total
              onMonthChange={(month) =>
                setCurrentMonth(month.dateString.substring(0, 7))
              }
              markedDates={markedDates}
              onDayPress={handleDayPress}
              hideExtraDays
              minDate={creationDate?.toLocaleDateString("en-CA")}
              theme={{
                selectedDayBackgroundColor: "#1DAA2D",
                todayTextColor: "#1DAA2D",
                arrowColor: "#4ADE80",
                monthTextColor: isDark ? "#ffffff" : "#000000",
                dayTextColor: isDark ? "#E5E5E5" : "#000000",
                textSectionTitleColor: isDark ? "#D1D5DB" : "#7B7B7B",
                textDayFontWeight: "700",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "700",
                calendarBackground: isDark ? "#1F2937" : "#ffffff",
                textDisabledColor: isDark ? "#6B7280" : "#C0C0C0",
              }}
              style={{
                borderRadius: 8,
                marginBottom: 16,
                backgroundColor: isDark ? "#1F2937" : "#ffffff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,
                elevation: 1,
              }}
            />

            <Text className="text-md font-black mt-4 mb-2 dark:text-white">
              ATIVIDADE DO MÊS
            </Text>
            <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm shadow-black mb-4">
              <View className="flex-row items-center gap-2 mb-4">
                <FontAwesome6
                  name="dumbbell"
                  size={16}
                  color={isDark ? "#ffffff" : "#323232"}
                />
                <Text className="text-sm text-black font-black dark:text-white">
                  TREINOS: {currentMonthLogs.length}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <FontAwesome6
                  name="chart-column"
                  size={20}
                  color={isDark ? "#ffffff" : "#323232"}
                />
                <Text className="text-sm text-black font-black dark:text-white">
                  MÉDIA POR SEMANA: {average}
                </Text>
              </View>
            </View>

            <Text className="text-md font-black mt-4 mb-2 dark:text-white">
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
