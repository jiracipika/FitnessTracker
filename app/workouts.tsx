"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import WorkoutCard from "../components/WorkoutCard"

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
  {
    id: 5,
    type: "Running",
    date: "2025-03-12",
    duration: 40,
    distance: 6.0,
    calories: 480,
    completed: true,
  },
  {
    id: 6,
    type: "Swimming",
    date: "2025-03-10",
    duration: 45,
    distance: 1.5,
    calories: 400,
    completed: true,
  },
  {
    id: 7,
    type: "HIIT",
    date: "2025-03-09",
    duration: 25,
    calories: 320,
    completed: true,
  },
  {
    id: 8,
    type: "Weight Training",
    date: "2025-03-07",
    duration: 50,
    sets: 18,
    reps: 10,
    calories: 380,
    completed: true,
  },
]

export default function WorkoutsScreen() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Simulate API call to your Django backend
    setTimeout(() => {
      setWorkouts(mockWorkouts)
      setIsLoading(false)
    }, 500)
  }, [])

  const filterWorkouts = () => {
    if (filter === "all") return workouts
    return workouts.filter((workout) => workout.type.toLowerCase() === filter.toLowerCase())
  }

  const renderFilterButton = (label, value) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === value ? styles.filterButtonActive : null]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.filterButtonText, filter === value ? styles.filterButtonTextActive : null]}>{label}</Text>
    </TouchableOpacity>
  )

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4285F4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout History</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="#4285F4" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderFilterButton("All", "all")}
          {renderFilterButton("Running", "running")}
          {renderFilterButton("Cycling", "cycling")}
          {renderFilterButton("Weight Training", "weight training")}
          {renderFilterButton("Yoga", "yoga")}
          {renderFilterButton("Swimming", "swimming")}
          {renderFilterButton("HIIT", "hiit")}
        </ScrollView>
      </View>

      <FlatList
        data={filterWorkouts()}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No workouts found</Text>
          </View>
        }
      />

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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  filtersContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  filterButtonActive: {
    backgroundColor: "#4285F4",
    borderColor: "#4285F4",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#666",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  listContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
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

