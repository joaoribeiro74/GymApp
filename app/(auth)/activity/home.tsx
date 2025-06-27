import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutHistoryCard from '../../../components/WorkoutHistoryCard'
import useUserWorkouts, { WorkoutLog } from '../../../hooks/useUserWorkouts';
import Loading from '../../../components/Loading';

function filterLast30Days(logs: WorkoutLog[]) {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return logs.filter((log) => {
    return log.date >= thirtyDaysAgo && log.date <= today;
  });
}
export default function HomeActivity() {
  const { workoutLogs, loading } = useUserWorkouts();
    const last30DaysLogs = filterLast30Days(workoutLogs);
  
    if (loading) return <Loading />;

  return (
    <SafeAreaView className="flex-1">
          <ScrollView>
            <View className="px-4 pb-4">
              <Text className="text-md font-black mb-4">
                HISTÓRICO DE TREINOS (ÚLTIMOS 30 DIAS)
              </Text>
              <View className="">
                {last30DaysLogs.map((log) => (
                  <WorkoutHistoryCard key={log.id} log={log} />
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
  )
}