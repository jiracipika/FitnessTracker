"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bell, LogOut, Moon } from "lucide-react"
import Link from "next/link"

// Mock data - would come from your Django backend in a real app
const mockProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  username: "alexj",
  joinDate: "2024-12-01",
  height: 180, // cm
  weight: 75, // kg
  dateOfBirth: "1990-05-15",
  profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
  preferences: {
    darkMode: false,
    notifications: true,
    emailUpdates: false,
    units: "metric", // or 'imperial'
  },
}

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    height: "",
    weight: "",
    dateOfBirth: "",
  })
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    emailUpdates: false,
    units: "metric",
  })

  useEffect(() => {
    // Simulate API call to your Django backend
    const timer = setTimeout(() => {
      setProfile(mockProfile)
      setFormData({
        name: mockProfile.name,
        email: mockProfile.email,
        username: mockProfile.username,
        height: mockProfile.height.toString(),
        weight: mockProfile.weight.toString(),
        dateOfBirth: mockProfile.dateOfBirth,
      })
      setPreferences(mockProfile.preferences)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleChange = (name) => {
    setPreferences((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const handleUnitChange = (value) => {
    setPreferences((prev) => ({
      ...prev,
      units: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // In a real app, this would send data to your Django backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setProfile({
        ...profile,
        name: formData.name,
        email: formData.email,
        username: formData.username,
        height: Number.parseFloat(formData.height),
        weight: Number.parseFloat(formData.weight),
        dateOfBirth: formData.dateOfBirth,
        preferences,
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    }
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    // BMI = weight(kg) / (height(m))^2
    const heightInMeters = height / 100
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
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
          <h1 className="text-2xl font-bold">Your Profile</h1>
        </div>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profile.profilePicture} alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">{profile.name}</CardTitle>
              <CardDescription className="text-center">
                Member since{" "}
                {new Date(profile.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Username</span>
                <span className="text-sm font-medium">@{profile.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">{profile.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Age</span>
                <span className="text-sm font-medium">{calculateAge(profile.dateOfBirth)} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Height</span>
                <span className="text-sm font-medium">
                  {preferences.units === "metric"
                    ? `${profile.height} cm`
                    : `${Math.floor(profile.height / 30.48)}' ${Math.round((profile.height / 2.54) % 12)}"`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Weight</span>
                <span className="text-sm font-medium">
                  {preferences.units === "metric"
                    ? `${profile.weight} kg`
                    : `${Math.round(profile.weight * 2.20462)} lbs`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">BMI</span>
                <span className="text-sm font-medium">{calculateBMI(profile.weight, profile.height)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue={isEditing ? "edit" : "settings"}>
            <TabsList className="mb-4">
              <TabsTrigger value="settings" disabled={isEditing}>
                Settings
              </TabsTrigger>
              <TabsTrigger value="security" disabled={isEditing}>
                Security
              </TabsTrigger>
              <TabsTrigger value="edit" disabled={!isEditing}>
                Edit Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Moon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                      </div>
                      <Switch
                        id="dark-mode"
                        checked={preferences.darkMode}
                        onCheckedChange={() => handleToggleChange("darkMode")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="notifications">Push Notifications</Label>
                      </div>
                      <Switch
                        id="notifications"
                        checked={preferences.notifications}
                        onCheckedChange={() => handleToggleChange("notifications")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="email-updates">Email Updates</Label>
                      </div>
                      <Switch
                        id="email-updates"
                        checked={preferences.emailUpdates}
                        onCheckedChange={() => handleToggleChange("emailUpdates")}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="units" className="mb-2 block">
                      Measurement Units
                    </Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="metric"
                          name="units"
                          value="metric"
                          checked={preferences.units === "metric"}
                          onChange={() => handleUnitChange("metric")}
                          className="h-4 w-4 rounded-full border-gray-300"
                        />
                        <Label htmlFor="metric">Metric (kg, cm)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="imperial"
                          name="units"
                          value="imperial"
                          checked={preferences.units === "imperial"}
                          onChange={() => handleUnitChange("imperial")}
                          className="h-4 w-4 rounded-full border-gray-300"
                        />
                        <Label htmlFor="imperial">Imperial (lb, ft/in)</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Password</h3>
                    <p className="text-sm text-muted-foreground mb-4">Last changed: 30 days ago</p>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Connected Devices</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage devices that are logged into your account
                    </p>
                    <Button variant="outline">View Devices</Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                  <Button variant="destructive">Delete Account</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="edit">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          value={formData.height}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          value={formData.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

