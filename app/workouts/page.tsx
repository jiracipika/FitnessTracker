"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  ArrowLeft,
  Calendar,
  Dumbbell,
  Filter,
  PlusCircle,
  MonitorIcon as Running,
  Search,
} from "lucide-react"
import Link from "next/link"

// Mock data - would come from your Django backend in a real app
const mockWorkouts = [
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
  {
    id: 4,
    type: "Yoga",
    date: "2025-03-14",
    duration: 30,
    calories: 200,
  },
  {
    id: 5,
    type: "Running",
    date: "2025-03-12",
    duration: 40,
    distance: 6.0,
    calories: 480,
  },
  {
    id: 6,
    type: "Swimming",
    date: "2025-03-10",
    duration: 45,
    distance: 1.5,
    calories: 400,
  },
  {
    id: 7,
    type: "HIIT",
    date: "2025-03-09",
    duration: 25,
    calories: 320,
  },
  {
    id: 8,
    type: "Weight Training",
    date: "2025-03-07",
    duration: 50,
    calories: 380,
  },
]

export default function WorkoutsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      setWorkouts(mockWorkouts)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Get icon based on workout type
  const getWorkoutIcon = (type) => {
    switch (type.toLowerCase()) {
      case "running":
        return <Running className="h-5 w-5" />
      case "weight training":
        return <Dumbbell className="h-5 w-5" />
      case "cycling":
        return <Activity className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Filter workouts based on search query and active filter
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || workout.type.toLowerCase() === activeFilter.toLowerCase()
    return matchesSearch && matchesFilter
  })

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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Workout History</h1>
        </div>
        <Button asChild>
          <Link href="/add-workout">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Workout
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter:</span>
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
            <option value="weight training">Weight Training</option>
            <option value="yoga">Yoga</option>
            <option value="swimming">Swimming</option>
            <option value="hiit">HIIT</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="list" className="mb-6">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Your Workouts</CardTitle>
              <CardDescription>
                {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredWorkouts.length > 0 ? (
                <div className="space-y-4">
                  {filteredWorkouts.map((workout) => (
                    <div
                      key={workout.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                      <div className="flex items-center gap-6">
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
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No workouts found</p>
                  <p className="text-sm text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button asChild>
                    <Link href="/add-workout">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Your First Workout
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>View your workouts by date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Calendar view coming soon</p>
                <p className="text-sm text-muted-foreground">We're working on this feature</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

