"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Calendar, Clock, Edit, Flame, Heart, Map, Share2, Trash2 } from "lucide-react"
import Link from "next/link"
import { LineChart } from "@/components/charts"

// Mock data - would come from your Django backend in a real app
const mockWorkoutDetails = {
  1: {
    id: 1,
    type: "Running",
    date: "2025-03-17",
    duration: 35,
    distance: 5.2,
    pace: "6:44",
    calories: 420,
    heartRate: 142,
    notes: "Felt good today. Increased pace in the last mile.",
    route: "Central Park Loop",
    splits: [
      { km: 1, time: "6:50", heartRate: 135 },
      { km: 2, time: "6:45", heartRate: 140 },
      { km: 3, time: "6:40", heartRate: 145 },
      { km: 4, time: "6:35", heartRate: 148 },
      { km: 5, time: "6:30", heartRate: 152 },
      { km: 5.2, time: "1:20", heartRate: 155 },
    ],
  },
  2: {
    id: 2,
    type: "Weight Training",
    date: "2025-03-16",
    duration: 45,
    calories: 350,
    heartRate: 128,
    notes: "Focused on upper body. Increased weight on bench press.",
    exercises: [
      { name: "Bench Press", sets: 3, reps: 10, weight: 185 },
      { name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
      { name: "Shoulder Press", sets: 3, reps: 12, weight: 95 },
      { name: "Bicep Curls", sets: 3, reps: 15, weight: 35 },
      { name: "Tricep Extensions", sets: 3, reps: 15, weight: 30 },
    ],
  },
  3: {
    id: 3,
    type: "Cycling",
    date: "2025-03-15",
    duration: 60,
    distance: 15,
    pace: "4:00",
    calories: 550,
    heartRate: 155,
    notes: "Long ride with some hill climbs. Weather was perfect.",
    route: "Riverside Drive",
    splits: [
      { km: 3, time: "12:00", heartRate: 140 },
      { km: 6, time: "12:30", heartRate: 150 },
      { km: 9, time: "12:15", heartRate: 160 },
      { km: 12, time: "12:45", heartRate: 155 },
      { km: 15, time: "12:30", heartRate: 165 },
    ],
  },
}

export default function WorkoutDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [workout, setWorkout] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      const workoutData = mockWorkoutDetails[params.id]
      setWorkout(workoutData)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleDelete = async () => {
    // In a real app, this would send a DELETE request to your Django backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect to workouts page after successful deletion
      router.push("/workouts")
    } catch (error) {
      console.error("Error deleting workout:", error)
      alert("Failed to delete workout. Please try again.")
    }
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Prepare heart rate chart data if available
  const heartRateChartData = workout?.splits
    ? {
        labels: workout.splits.map((split) => `${split.km} km`),
        datasets: [
          {
            label: "Heart Rate",
            data: workout.splits.map((split) => split.heartRate),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            tension: 0.3,
          },
        ],
      }
    : null

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading workout details...</p>
        </div>
      </div>
    )
  }

  if (!workout) {
    return (
      <div className="container py-10">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/workouts">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Workout Not Found</h1>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-lg font-medium mb-4">The workout you're looking for doesn't exist</p>
            <Button asChild>
              <Link href="/workouts">View All Workouts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/workouts">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{workout.type} Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/workouts/${workout.id}/edit`}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="text-destructive">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Workout</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this workout? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Workout Summary</CardTitle>
            <CardDescription>{formatDate(workout.date)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                <Clock className="h-5 w-5 text-muted-foreground mb-2" />
                <span className="text-2xl font-bold">{workout.duration}</span>
                <span className="text-sm text-muted-foreground">Minutes</span>
              </div>

              {workout.distance && (
                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                  <Map className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-2xl font-bold">{workout.distance}</span>
                  <span className="text-sm text-muted-foreground">Kilometers</span>
                </div>
              )}

              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                <Flame className="h-5 w-5 text-muted-foreground mb-2" />
                <span className="text-2xl font-bold">{workout.calories}</span>
                <span className="text-sm text-muted-foreground">Calories</span>
              </div>

              {workout.pace && (
                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                  <Calendar className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-2xl font-bold">{workout.pace}</span>
                  <span className="text-sm text-muted-foreground">Pace (min/km)</span>
                </div>
              )}

              {workout.heartRate && (
                <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                  <Heart className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-2xl font-bold">{workout.heartRate}</span>
                  <span className="text-sm text-muted-foreground">Avg Heart Rate</span>
                </div>
              )}
            </div>

            {workout.notes && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground">{workout.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Share your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground mb-4">Share this workout with your friends</p>
              <Button className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share Workout
              </Button>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Achievements</h3>
              <div className="space-y-2">
                {workout.type === "Running" && workout.distance > 5 && (
                  <Badge className="w-full justify-start text-xs py-2">5K Completed</Badge>
                )}
                {workout.calories > 400 && (
                  <Badge className="w-full justify-start text-xs py-2" variant="secondary">
                    400+ Calorie Burn
                  </Badge>
                )}
                {workout.duration > 30 && (
                  <Badge className="w-full justify-start text-xs py-2" variant="outline">
                    30+ Minute Workout
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue={workout.splits ? "splits" : workout.exercises ? "exercises" : "details"}>
          <TabsList>
            {workout.splits && <TabsTrigger value="splits">Splits</TabsTrigger>}
            {workout.exercises && <TabsTrigger value="exercises">Exercises</TabsTrigger>}
            <TabsTrigger value="details">Details</TabsTrigger>
            {heartRateChartData && <TabsTrigger value="charts">Charts</TabsTrigger>}
          </TabsList>

          {workout.splits && (
            <TabsContent value="splits">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Splits</CardTitle>
                  <CardDescription>Detailed breakdown of your {workout.type.toLowerCase()} segments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-3 text-left font-medium">Distance</th>
                          <th className="p-3 text-left font-medium">Time</th>
                          <th className="p-3 text-left font-medium">Heart Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workout.splits.map((split, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="p-3">{split.km} km</td>
                            <td className="p-3">{split.time}</td>
                            <td className="p-3">{split.heartRate} bpm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {workout.exercises && (
            <TabsContent value="exercises">
              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                  <CardDescription>Details of your strength training session</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-3 text-left font-medium">Exercise</th>
                          <th className="p-3 text-left font-medium">Sets</th>
                          <th className="p-3 text-left font-medium">Reps</th>
                          <th className="p-3 text-left font-medium">Weight (lbs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workout.exercises.map((exercise, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="p-3">{exercise.name}</td>
                            <td className="p-3">{exercise.sets}</td>
                            <td className="p-3">{exercise.reps}</td>
                            <td className="p-3">{exercise.weight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
                <CardDescription>More information about your workout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                      <p>{formatDate(workout.date)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                      <p>{workout.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                      <p>{workout.duration} minutes</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Calories</h3>
                      <p>{workout.calories} kcal</p>
                    </div>
                    {workout.distance && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Distance</h3>
                        <p>{workout.distance} km</p>
                      </div>
                    )}
                    {workout.pace && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Pace</h3>
                        <p>{workout.pace} min/km</p>
                      </div>
                    )}
                    {workout.heartRate && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Heart Rate</h3>
                        <p>{workout.heartRate} bpm</p>
                      </div>
                    )}
                    {workout.route && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Route</h3>
                        <p>{workout.route}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {heartRateChartData && (
            <TabsContent value="charts">
              <Card>
                <CardHeader>
                  <CardTitle>Heart Rate</CardTitle>
                  <CardDescription>Heart rate during your workout</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart data={heartRateChartData} height={300} />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/workouts">Back to Workouts</Link>
        </Button>
        <Button asChild>
          <Link href={`/workouts/${workout.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Workout
          </Link>
        </Button>
      </div>
    </div>
  )
}

