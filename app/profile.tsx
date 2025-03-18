"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

export default function ProfileScreen() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    // Simulate API call to your Django backend
    setTimeout(() => {
      setProfile({
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        joinDate: "2024-12-01",
        totalWorkouts: 87,
        totalDistance: 423,
        totalCalories: 32450,
        goals: {
          weeklyWorkouts: 5,
          caloriesBurned: 2500,
        },
      })
      setIsLoading(false)
    }, 500)
  }, [])

  const toggleDarkMode = () => setDarkMode((previousState) => !previousState)
  const toggleNotifications = () => setNotifications((previousState) => !previousState)

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
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
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#4285F4" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.profileImage} />
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
          <Text style={styles.profileJoinDate}>
            Member since {new Date(profile.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.totalDistance}</Text>
            <Text style={styles.statLabel}>Kilometers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.totalCalories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Goals</Text>
          <View style={styles.goalItem}>
            <View>
              <Text style={styles.goalLabel}>Weekly Workouts</Text>
              <Text style={styles.goalValue}>{profile.goals.weeklyWorkouts} workouts</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={20} color="#4285F4" />
            </TouchableOpacity>
          </View>
          <View style={styles.goalItem}>
            <View>
              <Text style={styles.goalLabel}>Weekly Calories Burned</Text>
              <Text style={styles.goalValue}>{profile.goals.caloriesBurned} calories</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={20} color="#4285F4" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#D1D1D6", true: "#81b0ff" }}
              thumbColor={darkMode ? "#4285F4" : "#f4f3f4"}
              ios_backgroundColor="#D1D1D6"
              onValueChange={toggleDarkMode}
              value={darkMode}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              trackColor={{ false: "#D1D1D6", true: "#81b0ff" }}
              thumbColor={notifications ? "#4285F4" : "#f4f3f4"}
              ios_backgroundColor="#D1D1D6"
              onValueChange={toggleNotifications}
              value={notifications}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  profileJoinDate: {
    fontSize: 12,
    color: "#999",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4285F4",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  sectionContainer: {
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
    marginBottom: 15,
    color: "#333",
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  goalLabel: {
    fontSize: 14,
    color: "#333",
  },
  goalValue: {
    fontSize: 12,
    color: "#666",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  settingLabel: {
    fontSize: 14,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#F44336",
    borderRadius: 8,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

