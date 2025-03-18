"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, Check, Heart, MessageCircle, Settings, ThumbsUp, Trophy } from "lucide-react"
import Link from "next/link"

// Mock data - would come from your Django backend in a real app
const mockNotifications = {
  unread: [
    {
      id: 1,
      type: "like",
      user: {
        id: 2,
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      content: "liked your workout",
      workout: {
        id: 1,
        type: "Running",
        date: "2025-03-17",
      },
      timestamp: "2025-03-17T10:30:00Z",
    },
    {
      id: 2,
      type: "comment",
      user: {
        id: 3,
        name: "Mike Chen",
        username: "mikec",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      content: "commented on your workout",
      workout: {
        id: 1,
        type: "Running",
        date: "2025-03-17",
      },
      comment: "Great pace! How did you feel during the run?",
      timestamp: "2025-03-17T11:15:00Z",
    },
    {
      id: 3,
      type: "achievement",
      content: "You earned a new achievement",
      achievement: {
        name: "5K Completed",
        description: "Completed a 5K run",
      },
      timestamp: "2025-03-17T09:45:00Z",
    },
  ],
  read: [
    {
      id: 4,
      type: "follow",
      user: {
        id: 4,
        name: "Emily Rodriguez",
        username: "emilyr",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      content: "started following you",
      timestamp: "2025-03-16T14:20:00Z",
    },
    {
      id: 5,
      type: "goal",
      content: "You reached your weekly workout goal",
      goal: {
        name: "Weekly Workouts",
        target: 5,
      },
      timestamp: "2025-03-15T23:00:00Z",
    },
    {
      id: 6,
      type: "like",
      user: {
        id: 5,
        name: "David Kim",
        username: "davidk",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      content: "liked your workout",
      workout: {
        id: 2,
        type: "Weight Training",
        date: "2025-03-16",
      },
      timestamp: "2025-03-16T18:45:00Z",
    },
  ],
}

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState({ unread: [], read: [] })

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      setNotifications(mockNotifications)
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

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="h-4 w-4 text-blue-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-green-500" />
      case "follow":
        return <Heart className="h-4 w-4 text-red-500" />
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case "goal":
        return <Check className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    // In a real app, this would send a request to your Django backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Update local state
      setNotifications({
        unread: [],
        read: [...notifications.unread, ...notifications.read],
      })
    } catch (error) {
      console.error("Error marking notifications as read:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading notifications...</p>
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
          <h1 className="text-2xl font-bold">Notifications</h1>
          {notifications.unread.length > 0 && <Badge className="ml-2 bg-primary">{notifications.unread.length}</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={notifications.unread.length === 0}>
            Mark All as Read
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Notification Settings</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All
            {notifications.unread.length + notifications.read.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.unread.length + notifications.read.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {notifications.unread.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.unread.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Your recent activity and updates</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.unread.length === 0 && notifications.read.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm text-muted-foreground">You're all caught up! Check back later for updates.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.unread.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                        {notification.user ? (
                          <Avatar>
                            <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                            <AvatarFallback>
                              {notification.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{notification.user ? notification.user.name : "FitTrack"}</p>
                          <Badge variant="outline" className="text-xs">
                            New
                          </Badge>
                        </div>
                        <p className="text-sm">
                          {notification.content}
                          {notification.workout && (
                            <span className="font-medium">
                              {" "}
                              {notification.workout.type} on{" "}
                              {new Date(notification.workout.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </p>
                        {notification.comment && (
                          <p className="mt-1 rounded-md bg-muted p-2 text-sm italic">"{notification.comment}"</p>
                        )}
                        {notification.achievement && (
                          <div className="mt-1 flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <p className="text-sm font-medium">{notification.achievement.name}</p>
                          </div>
                        )}
                        {notification.goal && (
                          <div className="mt-1 flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <p className="text-sm font-medium">
                              {notification.goal.name}: {notification.goal.target} workouts
                            </p>
                          </div>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">{formatDate(notification.timestamp)}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    </div>
                  ))}

                  {notifications.read.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                        {notification.user ? (
                          <Avatar>
                            <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                            <AvatarFallback>
                              {notification.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{notification.user ? notification.user.name : "FitTrack"}</p>
                        <p className="text-sm">
                          {notification.content}
                          {notification.workout && (
                            <span className="font-medium">
                              {" "}
                              {notification.workout.type} on{" "}
                              {new Date(notification.workout.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </p>
                        {notification.comment && (
                          <p className="mt-1 rounded-md bg-muted p-2 text-sm italic">"{notification.comment}"</p>
                        )}
                        {notification.achievement && (
                          <div className="mt-1 flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <p className="text-sm font-medium">{notification.achievement.name}</p>
                          </div>
                        )}
                        {notification.goal && (
                          <div className="mt-1 flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <p className="text-sm font-medium">
                              {notification.goal.name}: {notification.goal.target} workouts
                            </p>
                          </div>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">{formatDate(notification.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>Notifications you haven't seen yet</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.unread.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Check className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">All caught up!</p>
                  <p className="text-sm text-muted-foreground">You have no unread notifications.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.unread.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                        {notification.user ? (
                          <Avatar>
                            <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                            <AvatarFallback>
                              {notification.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{notification.user ? notification.user.name : "FitTrack"}</p>
                          <Badge variant="outline" className="text-xs">
                            New
                          </Badge>
                        </div>
                        <p className="text-sm">
                          {notification.content}
                          {notification.workout && (
                            <span className="font-medium">
                              {" "}
                              {notification.workout.type} on{" "}
                              {new Date(notification.workout.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </p>
                        {notification.comment && (
                          <p className="mt-1 rounded-md bg-muted p-2 text-sm italic">"{notification.comment}"</p>
                        )}
                        {notification.achievement && (
                          <div className="mt-1 flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <p className="text-sm font-medium">{notification.achievement.name}</p>
                          </div>
                        )}
                        {notification.goal && (
                          <div className="mt-1 flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <p className="text-sm font-medium">
                              {notification.goal.name}: {notification.goal.target} workouts
                            </p>
                          </div>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">{formatDate(notification.timestamp)}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

