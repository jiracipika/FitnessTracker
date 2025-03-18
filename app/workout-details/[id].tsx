"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { useRouter, useLocalSearchParams } from "expo-router"

// Mock data - would come from your Django backend in a real app
const mockWorkouts = [
  {
    id: 1,
    type: "Running",
    date: "2025-03-17",
    duration: 35,
    distance: 5.2,
    pace: "6:44",
    calories: 420,
    heartRate: 142,
    notes: "Felt good today. Increased pace in the last mile.",
    completed: true,
  },
  {
    id: 2,
    type: "Weight Training",
    date: "2025-03-16",
    duration: 45,
    sets: 15,
    reps: 12,
    weight: 185,
    calories: 350,
    heartRate: 128,
    notes: "Focused on upper body. Increased weight on bench press.",
    completed: true,
  },
  {
    id: 3,
    type: "Cycling",
    date: "2025-03-15",
    duration: 60,
    distance: 15,
    pace: "4:00",
    calories: 550,
    heartRate: 155,
    notes: "Long ride with some hill climbs. Weather was perfect.",
    completed: true,
  },
  {
    id: 4,
    type: "Yoga",
    date: "2025-03-14",
    duration: 30,
    calories: 200,
    heartRate: 95,
    notes: "Focused on flexibility and breathing. Felt very relaxed after.",
    completed: true,
  },
]

export default function WorkoutDetailsScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [workout, setWorkout] = useState(null)

  useEffect(() => {
    // Simulate API call to your Django backend
    setTimeout(() => {
      const foundWorkout = mockWorkouts.find((w) => w.id === Number(id))
      setWorkout(foundWorkout)
      setIsLoading(false)
    }, 500)
  }, [id])

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Get icon based on workout type
  const getWorkoutIcon = (type) => {
    switch (type.toLowerCase()) {
      case "running":
        return "walk-outline"
      case "weight training":
        return "barbell-outline"
      case "cycling":
        return "bicycle-outline"
      case "yoga":
        return "body-outline"
      case "swimming":
        return "water-outline"
      default:
        return "fitness-outline"
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    )
  }

  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#4285F4" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Workout Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Workout not found</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4285F4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout Details</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#4285F4" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.workoutHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name={getWorkoutIcon(workout.type)} size={32} color="#4285F4" />
          </View>
          <View>
            <Text style={styles.workoutType}>{workout.type}</Text>
            <Text style={styles.workoutDate}>{formatDate(workout.date)}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={24} color="#4285F4" />
            <Text style={styles.statValue}>{workout.duration}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="flame-outline" size={24} color="#4285F4" />
            <Text style={styles.statValue}>{workout.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>

          {workout.distance && (
            <View style={styles.statCard}>
              <Ionicons name="map-outline" size={24} color="#4285F4" />
              <Text style={styles.statValue}>{workout.distance}</Text>
              <Text style={styles.statLabel}>Kilometers</Text>
            </View>
          )}

          {workout.heartRate && (
            <View style={styles.statCard}>
              <Ionicons name="heart-outline" size={24} color="#4285F4" />
              <Text style={styles.statValue}>{workout.heartRate}</Text>
              <Text style={styles.statLabel}>Avg HR</Text>
            </View>
          )}

          {workout.pace && (
            <View style={styles.statCard}>
              <Ionicons name="speedometer-outline" size={24} color="#4285F4" />
              <Text style={styles.statValue}>{workout.pace}</Text>
              <Text style={styles.statLabel}>Pace</Text>
            </View>
          )}

          {workout.sets && (
            <View style={styles.statCard}>
              <Ionicons name="repeat-outline" size={24} color="#4285F4" />
              <Text style={styles.statValue}>{workout.sets}</Text>
              <Text style={styles.statLabel}>Sets</Text>
            </View>
          )}
        </View>

        {workout.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{workout.notes}</Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
            <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
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
  contentContainer: {
    padding: 20,
  },
  workoutHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "#F0F6FF",
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  workoutType: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  workoutDate: {
    fontSize: 14,
    color: "#666",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    width: "30%",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  notesContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  notesText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    marginRight: 0,
    marginLeft: 10,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 20,
    width: 150,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})

