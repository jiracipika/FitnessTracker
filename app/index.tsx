"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import WorkoutCard from "../components/WorkoutCard"
import { useRouter } from "expo-router"

// Mock data - would come from your Django backend in a real app
const mockWorkouts = [
  {
    id: 1,
    type: "Running",
    date: "2025-03-17",
    duration: 35,
    distance: 5.2,
    calories: 420,
    completed: true,
  },
  {
    id: 2,
    type: "Weight Training",
    date: "2025-03-16",
    duration: 45,
    sets: 15,
    reps: 12,
    calories: 350,
    completed: true,
  },
  {
    id: 3,
    type: "Cycling",
    date: "2025-03-15",
    duration: 60,
    distance: 15,
    calories: 550,
    completed: true,
  },
  {
    id: 4,
    type: "Yoga",
    date: "2025-03-14",
    duration: 30,
    calories: 200,
    completed: true,
  },
]

// Mock chart data - would be calculated from your workout history
const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [350, 420, 200, 550, 350, 420, 0],
      color: (opacity = 1) => `rgba(66, 133, 244, ${opacity})`,
      strokeWidth: 2,
    },
  ],
}

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])
  const [stats, setStats] = useState({
    weeklyCalories: 0,
    weeklyWorkouts: 0,
    streak: 0,
  })
  const router = useRouter()

  useEffect(() => {
    // Simulate API call to your Django backend
    setTimeout(() => {
      setWorkouts(mockWorkouts)
      setStats({
        weeklyCalories: 2290,
        weeklyWorkouts: 4,
        streak: 7,
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Loading your fitness data...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FitTrack</Text>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Ionicons name="person-circle-outline" size={32} color="#4285F4" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.weeklyCalories}</Text>
            <Text style={styles.statLabel}>Weekly Calories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.weeklyWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Weekly Progress Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(66, 133, 244, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#4285F4",
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Recent Workouts */}
        <View style={styles.workoutsContainer}>
          <View style={styles.workoutsHeader}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            <TouchableOpacity onPress={() => router.push("/workouts")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </View>
      </ScrollView>

      {/* Add Workout Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/add-workout")}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4285F4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4285F4",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4285F4",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  workoutsContainer: {
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  workoutsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  seeAllText: {
    color: "#4285F4",
    fontSize: 14,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4285F4",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
})

