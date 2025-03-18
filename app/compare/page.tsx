"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/charts"
import { ArrowLeft, ArrowRight, BarChart3, LineChartIcon, RefreshCw } from "lucide-react"
import Link from "next/link"

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
  },
  {
    id: 2,
    type: "Running",
    date: "2025-03-10",
    duration: 32,
    distance: 5.0,
    pace: "6:24",
    calories: 410,
    heartRate: 145,
  },
  {
    id: 3,
    type: "Running",
    date: "2025-03-03",
    duration: 38,
    distance: 5.5,
    pace: "6:55",
    calories: 440,
    heartRate: 138,
  },
  {
    id: 4,
    type: "Cycling",
    date: "2025-03-15",
    duration: 60,
    distance: 15,
    pace: "4:00",
    calories: 550,
    heartRate: 155,
  },
  {
    id: 5,
    type: "Cycling",
    date: "2025-03-08",
    duration: 55,
    distance: 14,
    pace: "3:56",
    calories: 520,
    heartRate: 150,
  },
  {
    id: 6,
    type: "Weight Training",
    date: "2025-03-16",
    duration: 45,
    calories: 350,
    heartRate: 128,
  },
  {
    id: 7,
    type: "Weight Training",
    date: "2025-03-09",
    duration: 50,
    calories: 380,
    heartRate: 132,
  },
]

export default function ComparePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])
  const [workoutTypes, setWorkoutTypes] = useState([])
  const [selectedType, setSelectedType] = useState("")
  const [workout1, setWorkout1] = useState("")
  const [workout2, setWorkout2] = useState("")
  const [comparisonData, setComparisonData] = useState(null)

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      setWorkouts(mockWorkouts)

      // Extract unique workout types
      const types = [...new Set(mockWorkouts.map((workout) => workout.type))]
      setWorkoutTypes(types)

      if (types.length > 0) {
        setSelectedType(types[0])
      }

      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Filter workouts by selected type
  const filteredWorkouts = workouts.filter((workout) => workout.type === selectedType)

  // Handle type selection
  const handleTypeChange = (value) => {
    setSelectedType(value)
    setWorkout1("")
    setWorkout2("")
    setComparisonData(null)
  }

  // Handle workout selection
  const handleWorkout1Change = (value) => {
    setWorkout1(value)
    if (workout2) {
      generateComparisonData(value, workout2)
    }
  }

  const handleWorkout2Change = (value) => {
    setWorkout2(value)
    if (workout1) {
      generateComparisonData(workout1, value)
    }
  }

  // Generate comparison data
  const generateComparisonData = (id1, id2) => {
    const w1 = workouts.find((w) => w.id.toString() === id1)
    const w2 = workouts.find((w) => w.id.toString() === id2)

    if (!w1 || !w2) return

    // Format dates for display
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }

    // Calculate percentage difference
    const calculateDiff = (val1, val2) => {
      if (!val1 || !val2) return 0
      return (((val2 - val1) / val1) * 100).toFixed(1)
    }

    // Prepare chart data
    const metricsChart = {
      labels: ["Duration (min)", "Calories", "Heart Rate (avg)"],
      datasets: [
        {
          label: formatDate(w1.date),
          data: [w1.duration, w1.calories, w1.heartRate],
          backgroundColor: "rgba(66, 133, 244, 0.7)",
        },
        {
          label: formatDate(w2.date),
          data: [w2.duration, w2.calories, w2.heartRate],
          backgroundColor: "rgba(219, 68, 55, 0.7)",
        },
      ],
    }

    // Add distance and pace if available
    if (w1.distance && w2.distance) {
      // Convert pace from string (mm:ss) to seconds for comparison
      const paceToSeconds = (pace) => {
        const [min, sec] = pace.split(":").map(Number)
        return min * 60 + sec
      }

      const pace1Seconds = paceToSeconds(w1.pace)
      const pace2Seconds = paceToSeconds(w2.pace)

      // For pace, lower is better, so we invert the difference calculation
      const paceDiff = (((pace1Seconds - pace2Seconds) / pace1Seconds) * 100).toFixed(1)

      const distanceChart = {
        labels: [formatDate(w1.date), formatDate(w2.date)],
        datasets: [
          {
            label: "Distance (km)",
            data: [w1.distance, w2.distance],
            backgroundColor: ["rgba(66, 133, 244, 0.7)", "rgba(219, 68, 55, 0.7)"],
          },
        ],
      }

      setComparisonData({
        workout1: {
          id: w1.id,
          date: formatDate(w1.date),
          duration: w1.duration,
          calories: w1.calories,
          heartRate: w1.heartRate,
          distance: w1.distance,
          pace: w1.pace,
        },
        workout2: {
          id: w2.id,
          date: formatDate(w2.date),
          duration: w2.duration,
          calories: w2.calories,
          heartRate: w2.heartRate,
          distance: w2.distance,
          pace: w2.pace,
        },
        differences: {
          duration: calculateDiff(w1.duration, w2.duration),
          calories: calculateDiff(w1.calories, w2.calories),
          heartRate: calculateDiff(w1.heartRate, w2.heartRate),
          distance: calculateDiff(w1.distance, w2.distance),
          pace: paceDiff,
        },
        charts: {
          metrics: metricsChart,
          distance: distanceChart,
        },
      })
    } else {
      setComparisonData({
        workout1: {
          id: w1.id,
          date: formatDate(w1.date),
          duration: w1.duration,
          calories: w1.calories,
          heartRate: w1.heartRate,
        },
        workout2: {
          id: w2.id,
          date: formatDate(w2.date),
          duration: w2.duration,
          calories: w2.calories,
          heartRate: w2.heartRate,
        },
        differences: {
          duration: calculateDiff(w1.duration, w2.duration),
          calories: calculateDiff(w1.calories, w2.calories),
          heartRate: calculateDiff(w1.heartRate, w2.heartRate),
        },
        charts: {
          metrics: metricsChart,
        },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your workouts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Compare Workouts</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Workouts to Compare</CardTitle>
          <CardDescription>Choose two workouts of the same type to see how they compare</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Workout Type</label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  {workoutTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">First Workout</label>
              <Select value={workout1} onValueChange={handleWorkout1Change} disabled={!selectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first workout" />
                </SelectTrigger>
                <SelectContent>
                  {filteredWorkouts.map((workout) => (
                    <SelectItem key={workout.id} value={workout.id.toString()}>
                      {new Date(workout.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                      {workout.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Second Workout</label>
              <Select value={workout2} onValueChange={handleWorkout2Change} disabled={!workout1}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second workout" />
                </SelectTrigger>
                <SelectContent>
                  {filteredWorkouts
                    .filter((workout) => workout.id.toString() !== workout1)
                    .map((workout) => (
                      <SelectItem key={workout.id} value={workout.id.toString()}>
                        {new Date(workout.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                        {workout.type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {comparisonData ? (
        <>
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{comparisonData.workout1.duration} min</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                  <div className="text-2xl font-bold">{comparisonData.workout2.duration} min</div>
                  <div
                    className={`ml-2 text-sm font-medium ${Number.parseFloat(comparisonData.differences.duration) > 0 ? "text-green-600" : Number.parseFloat(comparisonData.differences.duration) < 0 ? "text-red-600" : "text-muted-foreground"}`}
                  >
                    {comparisonData.differences.duration > 0 ? "+" : ""}
                    {comparisonData.differences.duration}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Calories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{comparisonData.workout1.calories}</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                  <div className="text-2xl font-bold">{comparisonData.workout2.calories}</div>
                  <div
                    className={`ml-2 text-sm font-medium ${Number.parseFloat(comparisonData.differences.calories) > 0 ? "text-green-600" : Number.parseFloat(comparisonData.differences.calories) < 0 ? "text-red-600" : "text-muted-foreground"}`}
                  >
                    {comparisonData.differences.calories > 0 ? "+" : ""}
                    {comparisonData.differences.calories}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Heart Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{comparisonData.workout1.heartRate} bpm</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                  <div className="text-2xl font-bold">{comparisonData.workout2.heartRate} bpm</div>
                  <div
                    className={`ml-2 text-sm font-medium ${Number.parseFloat(comparisonData.differences.heartRate) > 0 ? "text-green-600" : Number.parseFloat(comparisonData.differences.heartRate) < 0 ? "text-red-600" : "text-muted-foreground"}`}
                  >
                    {comparisonData.differences.heartRate > 0 ? "+" : ""}
                    {comparisonData.differences.heartRate}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {comparisonData.workout1.distance && (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Distance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{comparisonData.workout1.distance} km</div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                      <div className="text-2xl font-bold">{comparisonData.workout2.distance} km</div>
                      <div
                        className={`ml-2 text-sm font-medium ${Number.parseFloat(comparisonData.differences.distance) > 0 ? "text-green-600" : Number.parseFloat(comparisonData.differences.distance) < 0 ? "text-red-600" : "text-muted-foreground"}`}
                      >
                        {comparisonData.differences.distance > 0 ? "+" : ""}
                        {comparisonData.differences.distance}%
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pace</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{comparisonData.workout1.pace} min/km</div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                      <div className="text-2xl font-bold">{comparisonData.workout2.pace} min/km</div>
                      <div
                        className={`ml-2 text-sm font-medium ${Number.parseFloat(comparisonData.differences.pace) > 0 ? "text-green-600" : Number.parseFloat(comparisonData.differences.pace) < 0 ? "text-red-600" : "text-muted-foreground"}`}
                      >
                        {comparisonData.differences.pace > 0 ? "+" : ""}
                        {comparisonData.differences.pace}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <Tabs defaultValue="metrics">
            <TabsList>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Metrics Comparison
              </TabsTrigger>
              {comparisonData.charts.distance && (
                <TabsTrigger value="distance" className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  Distance Comparison
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <CardTitle>Metrics Comparison</CardTitle>
                  <CardDescription>
                    Comparing {comparisonData.workout1.date} vs {comparisonData.workout2.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart data={comparisonData.charts.metrics} height={300} />
                </CardContent>
              </Card>
            </TabsContent>

            {comparisonData.charts.distance && (
              <TabsContent value="distance">
                <Card>
                  <CardHeader>
                    <CardTitle>Distance Comparison</CardTitle>
                    <CardDescription>
                      Comparing {comparisonData.workout1.date} vs {comparisonData.workout2.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={comparisonData.charts.distance} height={300} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/workouts">View All Workouts</Link>
            </Button>
            <Button
              onClick={() => {
                setWorkout1("")
                setWorkout2("")
                setComparisonData(null)
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Comparison
            </Button>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-muted p-6 mb-4">
              <BarChart3 className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">Select two workouts to compare</p>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
              Compare your workouts to track your progress and identify areas for improvement
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

