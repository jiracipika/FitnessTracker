"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, MessageCircle, Search, Share2, ThumbsUp, Users } from "lucide-react"
import Link from "next/link"

// Mock data - would come from your Django backend in a real app
const mockFeed = [
  {
    id: 1,
    user: {
      id: 2,
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    type: "workout",
    workout: {
      type: "Running",
      distance: 8.5,
      duration: 45,
      date: "2025-03-17T09:30:00Z",
    },
    caption: "Morning run along the river! Beautiful day. 🏃‍♀️",
    likes: 12,
    comments: 3,
    timestamp: "2025-03-17T09:45:00Z",
  },
  {
    id: 2,
    user: {
      id: 3,
      name: "Mike Chen",
      username: "mikec",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    type: "achievement",
    achievement: {
      name: "10K Completed",
      description: "Completed a 10K run",
    },
    caption: "Finally hit that 10K milestone! Feeling accomplished. 💪",
    likes: 24,
    comments: 5,
    timestamp: "2025-03-16T16:20:00Z",
  },
  {
    id: 3,
    user: {
      id: 4,
      name: "Emily Rodriguez",
      username: "emilyr",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    type: "goal",
    goal: {
      name: "Weekly Workouts",
      target: 5,
      achieved: true,
    },
    caption: "Hit my weekly workout goal! Consistency is key. 🔑",
    likes: 18,
    comments: 2,
    timestamp: "2025-03-15T19:10:00Z",
  },
]

const mockFriends = [
  {
    id: 2,
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastWorkout: "2025-03-17T09:30:00Z",
  },
  {
    id: 3,
    name: "Mike Chen",
    username: "mikec",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    lastWorkout: "2025-03-16T16:20:00Z",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    username: "emilyr",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    lastWorkout: "2025-03-15T19:10:00Z",
  },
  {
    id: 5,
    name: "David Kim",
    username: "davidk",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    lastWorkout: "2025-03-14T07:45:00Z",
  },
  {
    id: 6,
    name: "Lisa Patel",
    username: "lisap",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    lastWorkout: "2025-03-13T18:30:00Z",
  },
]

const mockSuggestions = [
  {
    id: 7,
    name: "James Wilson",
    username: "jamesw",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    mutualFriends: 3,
  },
  {
    id: 8,
    name: "Sophia Lee",
    username: "sophial",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    mutualFriends: 2,
  },
  {
    id: 9,
    name: "Robert Garcia",
    username: "robertg",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    mutualFriends: 1,
  },
]

export default function SocialPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [feed, setFeed] = useState([])
  const [friends, setFriends] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      setFeed(mockFeed)
      setFriends(mockFriends)
      setSuggestions(mockSuggestions)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMs / 3600000)
    const diffDays = Math.round(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  // Filter friends based on search query
  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading social feed...</p>
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
        <h1 className="text-2xl font-bold">Social</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>See what your friends are up to</CardDescription>
            </CardHeader>
            <CardContent>
              {feed.length > 0 ? (
                <div className="space-y-6">
                  {feed.map((post) => (
                    <div key={post.id} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.user.avatar} alt={post.user.name} />
                            <AvatarFallback>
                              {post.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{post.user.name}</p>
                            <p className="text-xs text-muted-foreground">@{post.user.username}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(post.timestamp)}</p>
                      </div>

                      {post.type === "workout" && (
                        <div className="mb-3 rounded-md bg-muted p-3">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{post.workout.type}</p>
                            <Badge variant="outline">{formatDate(post.workout.date)}</Badge>
                          </div>
                          <div className="mt-2 flex gap-4 text-sm">
                            <p>{post.workout.distance} km</p>
                            <p>{post.workout.duration} min</p>
                          </div>
                        </div>
                      )}

                      {post.type === "achievement" && (
                        <div className="mb-3 rounded-md bg-muted p-3">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-500">Achievement</Badge>
                            <p className="font-medium">{post.achievement.name}</p>
                          </div>
                          <p className="mt-2 text-sm">{post.achievement.description}</p>
                        </div>
                      )}

                      {post.type === "goal" && (
                        <div className="mb-3 rounded-md bg-muted p-3">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500">Goal Achieved</Badge>
                            <p className="font-medium">{post.goal.name}</p>
                          </div>
                          <p className="mt-2 text-sm">Target: {post.goal.target} workouts</p>
                        </div>
                      )}

                      <p className="mb-3">{post.caption}</p>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No activity yet</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Follow friends to see their workouts and achievements
                  </p>
                  <Button>Find Friends</Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Share Your Workout
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="friends">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="friends" className="flex-1">
                Friends
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex-1">
                Suggestions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friends">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Your Friends</CardTitle>
                  <CardDescription>
                    {friends.length} friend{friends.length !== 1 ? "s" : ""}
                  </CardDescription>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search friends..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredFriends.length > 0 ? (
                    <div className="space-y-4">
                      {filteredFriends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>
                                {friend.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{friend.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Last workout: {formatDate(friend.lastWorkout)}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <p className="text-sm text-muted-foreground">No friends found matching "{searchQuery}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions">
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Friends</CardTitle>
                  <CardDescription>People you might know</CardDescription>
                </CardHeader>
                <CardContent>
                  {suggestions.length > 0 ? (
                    <div className="space-y-4">
                      {suggestions.map((suggestion) => (
                        <div key={suggestion.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                              <AvatarFallback>
                                {suggestion.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{suggestion.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {suggestion.mutualFriends} mutual friend{suggestion.mutualFriends !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <Button size="sm">Follow</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <p className="text-sm text-muted-foreground">No suggestions available at the moment</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

