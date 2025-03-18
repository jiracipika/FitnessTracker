"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Award, Calendar, Check, Dumbbell, Flame, PlusCircle, Target, Trophy } from "lucide-react"
import Link from "next/link"

// Mock data - would come from your Django backend in a real app
const mockGoals = [
  {
    id: 1,
    type: "weekly_workouts",
    name: "Weekly Workouts",
    target: 5,
    current: 3,
    unit: "workouts",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    achieved: false,
    icon: <Dumbbell className="h-5 w-5" />,
  },
  {
    id: 2,
    type: "weekly_distance",
    name: "Weekly Distance",
    target: 20,
    current: 15.5,
    unit: "km",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    achieved: false,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 3,
    type: "weekly_calories",
    name: "Weekly Calories",
    target: 2500,
    current: 1850,
    unit: "calories",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    achieved: false,
    icon: <Flame className="h-5 w-5" />,
  },
  {
    id: 4,
    type: "target_weight",
    name: "Target Weight",
    target: 70,
    current: 75,
    unit: "kg",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    achieved: false,
    icon: <Award className="h-5 w-5" />,
  },
]

const mockAchievements = [
  {
    id: 1,
    name: "5K Completed",
    description: "Completed a 5K run",
    date: "2025-02-15",
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    id: 2,
    name: "10 Workouts",
    description: "Completed 10 workouts",
    date: "2025-02-28",
    icon: <Award className="h-5 w-5" />,
  },
  {
    id: 3,
    name: "1000 Calories",
    description: "Burned 1000 calories in a week",
    date: "2025-03-05",
    icon: <Flame className="h-5 w-5" />,
  },
]

export default function GoalsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [goals, setGoals] = useState([])
  const [achievements, setAchievements] = useState([])
  const [newGoalOpen, setNewGoalOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    type: "",
    target: "",
    endDate: "",
  })

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      setGoals(mockGoals)
      setAchievements(mockAchievements)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewGoal((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setNewGoal((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs
    if (!newGoal.type || !newGoal.target || !newGoal.endDate) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, this would send data to your Django backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Close dialog and reset form
      setNewGoalOpen(false)
      setNewGoal({
        type: "",
        target: "",
        endDate: "",
      })

      // Refresh goals (in a real app, this would fetch updated goals from the backend)
      // For now, we'll just add a mock goal
      const mockNewGoal = {
        id: goals.length + 1,
        type: newGoal.type,
        name:
          newGoal.type === "weekly_workouts"
            ? "Weekly Workouts"
            : newGoal.type === "weekly_distance"
              ? "Weekly Distance"
              : newGoal.type === "weekly_calories"
                ? "Weekly Calories"
                : "Target Weight",
        target: Number.parseFloat(newGoal.target),
        current: 0,
        unit:
          newGoal.type === "weekly_workouts"
            ? "workouts"
            : newGoal.type === "weekly_distance"
              ? "km"
              : newGoal.type === "weekly_calories"
                ? "calories"
                : "kg",
        startDate: new Date().toISOString().split("T")[0],
        endDate: newGoal.endDate,
        achieved: false,
        icon:
          newGoal.type === "weekly_workouts" ? (
            <Dumbbell className="h-5 w-5" />
          ) : newGoal.type === "weekly_distance" ? (
            <Target className="h-5 w-5" />
          ) : newGoal.type === "weekly_calories" ? (
            <Flame className="h-5 w-5" />
          ) : (
            <Award className="h-5 w-5" />
          ),
      }

      setGoals((prev) => [...prev, mockNewGoal])
    } catch (error) {
      console.error("Error adding goal:", error)
      alert("Failed to add goal. Please try again.")
    }
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your goals...</p>
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
          <h1 className="text-2xl font-bold">Goals & Achievements</h1>
        </div>
        <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>Set a new fitness goal to track your progress</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-type">Goal Type</Label>
                  <Select value={newGoal.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                    <SelectTrigger id="goal-type">
                      <SelectValue placeholder="Select goal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly_workouts">Weekly Workouts</SelectItem>
                      <SelectItem value="weekly_distance">Weekly Distance</SelectItem>
                      <SelectItem value="weekly_calories">Weekly Calories</SelectItem>
                      <SelectItem value="target_weight">Target Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target Value</Label>
                  <Input
                    id="target"
                    name="target"
                    type="number"
                    placeholder="Enter target value"
                    value={newGoal.target}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {newGoal.type === "weekly_workouts"
                      ? "Number of workouts per week"
                      : newGoal.type === "weekly_distance"
                        ? "Distance in kilometers per week"
                        : newGoal.type === "weekly_calories"
                          ? "Calories to burn per week"
                          : newGoal.type === "target_weight"
                            ? "Target weight in kilograms"
                            : ""}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Target Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={newGoal.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setNewGoalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Goal</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        {goal.icon}
                      </div>
                      <CardTitle>{goal.name}</CardTitle>
                    </div>
                    {goal.achieved && (
                      <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        <Check className="h-3 w-3" />
                        <span>Achieved</span>
                      </div>
                    )}
                  </div>
                  <CardDescription>
                    Target: {goal.target} {goal.unit} by {formatDate(goal.endDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        Progress: {goal.current} / {goal.target} {goal.unit}
                      </span>
                      <span>{calculateProgress(goal.current, goal.target)}%</span>
                    </div>
                    <Progress value={calculateProgress(goal.current, goal.target)} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Update Progress
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {goals.length === 0 && (
              <Card className="md:col-span-2">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Target className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No active goals</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Set your first fitness goal to track your progress
                  </p>
                  <Button onClick={() => setNewGoalOpen(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Your First Goal
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Milestones you've reached in your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{formatDate(achievement.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No achievements yet</p>
                  <p className="text-sm text-muted-foreground">
                    Complete workouts and reach your goals to earn achievements
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

