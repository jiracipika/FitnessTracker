"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Flame, Medal, Trophy, Users } from "lucide-react"
import Link from "next/link"

// Mock data - would come from your Django backend in a real app
const mockLeaderboards = {
  weekly_workouts: [
    {
      user: {
        id: 3,
        name: "Mike Chen",
        username: "mikec",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      value: 8,
      rank: 1,
    },
    {
      user: {
        id: 1,
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      value: 6,
      rank: 2,
      isCurrentUser: true,
    },
    {
      user: {
        id: 2,
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      value: 5,
      rank: 3,
    },
    {
      user: {
        id: 4,
        name: "Emily Rodriguez",
        username: "emilyr",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      value: 4,
      rank: 4,
    },
    {
      user: {
        id: 5,
        name: "David Kim",
        username: "davidk",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      value: 3,
      rank: 5,
    },
  ],
  weekly_distance: [
    {
      user: {
        id: 2,
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      value: 42.5,
      rank: 1,
    },
    {
      user: {
        id: 3,
        name: "Mike Chen",
        username: "mikec",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      value: 35.2,
      rank: 2,
    },
    {
      user: {
        id: 1,
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      value: 28.7,
      rank: 3,
      isCurrentUser: true,
    },
    {
      user: {
        id: 5,
        name: "David Kim",
        username: "davidk",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      value: 22.3,
      rank: 4,
    },
    {
      user: {
        id: 4,
        name: "Emily Rodriguez",
        username: "emilyr",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      value: 18.5,
      rank: 5,
    },
  ],
  weekly_calories: [
    {
      user: {
        id: 3,
        name: "Mike Chen",
        username: "mikec",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      value: 3250,
      rank: 1,
    },
    {
      user: {
        id: 2,
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      value: 2980,
      rank: 2,
    },
    {
      user: {
        id: 5,
        name: "David Kim",
        username: "davidk",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      value: 2750,
      rank: 3,
    },
    {
      user: {
        id: 1,
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      value: 2290,
      rank: 4,
      isCurrentUser: true,
    },
    {
      user: {
        id: 4,
        name: "Emily Rodriguez",
        username: "emilyr",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      value: 1950,
      rank: 5,
    },
  ],
  streak: [
    {
      user: {
        id: 2,
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      value: 15,
      rank: 1,
    },
    {
      user: {
        id: 1,
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      value: 7,
      rank: 2,
      isCurrentUser: true,
    },
    {
      user: {
        id: 3,
        name: "Mike Chen",
        username: "mikec",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      value: 5,
      rank: 3,
    },
    {
      user: {
        id: 4,
        name: "Emily Rodriguez",
        username: "emilyr",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      value: 3,
      rank: 4,
    },
    {
      user: {
        id: 5,
        name: "David Kim",
        username: "davidk",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      value: 2,
      rank: 5,
    },
  ],
}

export default function LeaderboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [leaderboards, setLeaderboards] = useState({})

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      setLeaderboards(mockLeaderboards)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Get medal icon based on rank
  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />
      default:
        return <span className="flex h-5 w-5 items-center justify-center font-bold text-muted-foreground">{rank}</span>
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading leaderboards...</p>
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
        <h1 className="text-2xl font-bold">Leaderboards</h1>
      </div>

      <Tabs defaultValue="weekly_workouts">
        <TabsList className="mb-6">
          <TabsTrigger value="weekly_workouts" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Weekly Workouts
          </TabsTrigger>
          <TabsTrigger value="weekly_distance" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Weekly Distance
          </TabsTrigger>
          <TabsTrigger value="weekly_calories" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Weekly Calories
          </TabsTrigger>
          <TabsTrigger value="streak" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Streak
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly_workouts">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Workouts Leaderboard</CardTitle>
              <CardDescription>Top performers based on number of workouts this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboards.weekly_workouts.map((entry) => (
                  <div
                    key={entry.user.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${entry.isCurrentUser ? "bg-primary/10 border-primary/20" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center">{getMedalIcon(entry.rank)}</div>
                      <Avatar>
                        <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                        <AvatarFallback>
                          {entry.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {entry.user.name}
                          {entry.isCurrentUser && (
                            <Badge variant="outline" className="ml-2">
                              You
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">@{entry.user.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{entry.value}</p>
                      <p className="text-xs text-muted-foreground">workouts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly_distance">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Distance Leaderboard</CardTitle>
              <CardDescription>Top performers based on total distance covered this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboards.weekly_distance.map((entry) => (
                  <div
                    key={entry.user.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${entry.isCurrentUser ? "bg-primary/10 border-primary/20" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center">{getMedalIcon(entry.rank)}</div>
                      <Avatar>
                        <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                        <AvatarFallback>
                          {entry.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {entry.user.name}
                          {entry.isCurrentUser && (
                            <Badge variant="outline" className="ml-2">
                              You
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">@{entry.user.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{entry.value}</p>
                      <p className="text-xs text-muted-foreground">kilometers</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly_calories">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Calories Leaderboard</CardTitle>
              <CardDescription>Top performers based on calories burned this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboards.weekly_calories.map((entry) => (
                  <div
                    key={entry.user.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${entry.isCurrentUser ? "bg-primary/10 border-primary/20" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center">{getMedalIcon(entry.rank)}</div>
                      <Avatar>
                        <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                        <AvatarFallback>
                          {entry.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {entry.user.name}
                          {entry.isCurrentUser && (
                            <Badge variant="outline" className="ml-2">
                              You
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">@{entry.user.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{entry.value}</p>
                      <p className="text-xs text-muted-foreground">calories</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streak">
          <Card>
            <CardHeader>
              <CardTitle>Workout Streak Leaderboard</CardTitle>
              <CardDescription>Top performers based on consecutive days with workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboards.streak.map((entry) => (
                  <div
                    key={entry.user.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${entry.isCurrentUser ? "bg-primary/10 border-primary/20" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center">{getMedalIcon(entry.rank)}</div>
                      <Avatar>
                        <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                        <AvatarFallback>
                          {entry.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {entry.user.name}
                          {entry.isCurrentUser && (
                            <Badge variant="outline" className="ml-2">
                              You
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">@{entry.user.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{entry.value}</p>
                      <p className="text-xs text-muted-foreground">day streak</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

