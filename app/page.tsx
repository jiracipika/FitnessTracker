"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart, PieChart } from "@/components/charts"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Activity, Dumbbell, PlusCircle, MonitorIcon as Running, Trophy, User } from "lucide-react"
import Link from "next/link"

// Mock data - would come from your Django backend in a real app
const mockStats = {
  totalWorkouts: 87,
  totalDistance: 423,
  totalCalories: 32450,
  weeklyWorkouts: 4,
  weeklyCalories: 2290,
  streak: 7,
}

const mockChartData = {
  weeklyCalories: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories",
        data: [350, 420, 200, 550, 350, 420, 0],
        borderColor: "rgb(66, 133, 244)",
        backgroundColor: "rgba(66, 133, 244, 0.1)",
        tension: 0.3,
      },
    ],
  },
  workoutTypes: {
    labels: ["Running", "Cycling", "Weight Training", "Yoga", "Swimming"],
    datasets: [
      {
        label: "Workouts",
        data: [12, 8, 15, 5, 3],
        backgroundColor: [
          "rgba(66, 133, 244, 0.7)",
          "rgba(219, 68, 55, 0.7)",
          "rgba(244, 180, 0, 0.7)",
          "rgba(15, 157, 88, 0.7)",
          "rgba(171, 71, 188, 0.7)",
        ],
      },
    ],
  },
  monthlyDistance: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Distance (km)",
        data: [65, 78, 90, 81, 56, 55],
        backgroundColor: "rgba(66, 133, 244, 0.7)",
      },
    ],
  },
}

const recentWorkouts = [
  {
    id: 1,
    type: "Running",
    date: "2025-03-17",
    duration: 35,
    distance: 5.2,
    calories: 420,
  },
  {
    id: 2,
    type: "Weight Training",
    date: "2025-03-16",
    duration: 45,
    calories: 350,
  },
  {
    id: 3,
    type: "Cycling",
    date: "2025-03-15",
    duration: 60,
    distance: 15,
    calories: 550,
  },
]

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Get icon based on workout type
  const getWorkoutIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "running":
        return <Running className="h-4 w-4" />
      case "weight training":
        return <Dumbbell className="h-4 w-4" />
      case "cycling":
        return <Activity className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your fitness data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">FitTrack</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/workouts" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Workouts
            </Link>
            <Link href="/goals" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Goals
            </Link>
            <Link href="/analytics" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Analytics
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/profile">
                <User className="h-4 w-4" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
            <Button asChild>
              <Link href="/add-workout">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Workout
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Workouts</CardTitle>
                <CardDescription>Your lifetime workout count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{mockStats.totalWorkouts}</div>
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{mockStats.weeklyWorkouts} workouts this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Distance</CardTitle>
                <CardDescription>Your lifetime distance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{mockStats.totalDistance} km</div>
                  <Running className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Equivalent to {(mockStats.totalDistance / 42.2).toFixed(1)} marathons
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Calories Burned</CardTitle>
                <CardDescription>Your lifetime calories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{mockStats.totalCalories.toLocaleString()}</div>
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{mockStats.weeklyCalories} calories this week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12 mt-6">
            <Card className="md:col-span-4 lg:col-span-8">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your workout data for the current week</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="calories">
                  <TabsList className="mb-4">
                    <TabsTrigger value="calories">Calories</TabsTrigger>
                    <TabsTrigger value="workouts">Workouts</TabsTrigger>
                    <TabsTrigger value="distance">Distance</TabsTrigger>
                  </TabsList>
                  <TabsContent value="calories">
                    <LineChart data={mockChartData.weeklyCalories} height={300} />
                  </TabsContent>
                  <TabsContent value="workouts">
                    <PieChart data={mockChartData.workoutTypes} height={300} />
                  </TabsContent>
                  <TabsContent value="distance">
                    <BarChart data={mockChartData.monthlyDistance} height={300} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-4">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Your workout schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-xs text-muted-foreground">Workout completed</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Workouts</CardTitle>
                  <CardDescription>Your latest workout sessions</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/workouts">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWorkouts.map((workout) => (
                    <div
                      key={workout.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {getWorkoutIcon(workout.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{workout.type}</p>
                            <Badge variant="outline" className="text-xs">
                              {workout.duration} min
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{formatDate(workout.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {workout.distance && (
                          <div className="text-right">
                            <p className="text-sm font-medium">{workout.distance} km</p>
                            <p className="text-xs text-muted-foreground">Distance</p>
                          </div>
                        )}
                        <div className="text-right">
                          <p className="text-sm font-medium">{workout.calories}</p>
                          <p className="text-xs text-muted-foreground">Calories</p>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/workouts/${workout.id}`}>
                            <span className="sr-only">View workout</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Streak</CardTitle>
                <CardDescription>Keep your workout streak going!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <span className="text-2xl font-bold text-primary-foreground">{mockStats.streak}</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {mockStats.streak} day{mockStats.streak !== 1 ? "s" : ""} streak
                    </p>
                    <p className="text-sm text-muted-foreground">You're on a roll! Don't break the chain.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">alex.johnson@example.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

