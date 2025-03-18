"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

interface WorkoutProps {
  workout: {
    id: number
    type: string
    date: string
    duration: number
    distance?: number
    calories: number
    sets?: number
    reps?: number
    completed: boolean
  }
}

const WorkoutCard: React.FC<WorkoutProps> = ({ workout }) => {
  const router = useRouter()

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Get icon based on workout type
  const getWorkoutIcon = (type: string) => {
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

  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/workout-details/${workout.id}`)}>
      <View style={styles.iconContainer}>
        <Ionicons name={getWorkoutIcon(workout.type)} size={24} color="#4285F4" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.workoutType}>{workout.type}</Text>
        <Text style={styles.workoutDate}>{formatDate(workout.date)}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.statText}>{workout.duration} min</Text>
          </View>
          {workout.distance && (
            <View style={styles.statItem}>
              <Ionicons name="map-outline" size={14} color="#666" />
              <Text style={styles.statText}>{workout.distance} km</Text>
            </View>
          )}
          <View style={styles.statItem}>
            <Ionicons name="flame-outline" size={14} color="#666" />
            <Text style={styles.statText}>{workout.calories} cal</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: "#F0F6FF",
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  workoutType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  workoutDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  statText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
})

export default WorkoutCard

