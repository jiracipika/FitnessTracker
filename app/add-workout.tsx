"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Picker } from "@react-native-picker/picker"

const workoutTypes = [
  "Running",
  "Walking",
  "Cycling",
  "Swimming",
  "Weight Training",
  "Yoga",
  "HIIT",
  "Pilates",
  "Other",
]

export default function AddWorkoutScreen() {
  const router = useRouter()
  const [workoutType, setWorkoutType] = useState("Running")
  const [duration, setDuration] = useState("")
  const [distance, setDistance] = useState("")
  const [calories, setCalories] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    // Validate inputs
    if (!duration) {
      Alert.alert("Error", "Please enter workout duration")
      return
    }

    // In a real app, this would send data to your Django backend
    Alert.alert("Success", "Workout added successfully!", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4285F4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Workout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Workout Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={workoutType}
            onValueChange={(itemValue) => setWorkoutType(itemValue)}
            style={styles.picker}
          >
            {workoutTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          placeholder="Enter duration"
          keyboardType="numeric"
        />

        {(workoutType === "Running" ||
          workoutType === "Cycling" ||
          workoutType === "Swimming" ||
          workoutType === "Walking") && (
          <>
            <Text style={styles.label}>Distance (km)</Text>
            <TextInput
              style={styles.input}
              value={distance}
              onChangeText={setDistance}
              placeholder="Enter distance"
              keyboardType="numeric"
            />
          </>
        )}

        <Text style={styles.label}>Calories Burned</Text>
        <TextInput
          style={styles.input}
          value={calories}
          onChangeText={setCalories}
          placeholder="Enter calories"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add notes about your workout"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Workout</Text>
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
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})

