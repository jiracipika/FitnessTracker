import { NextResponse } from "next/server"

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
  stats: {
    totalWorkouts: 87,
    totalDistance: 423,
    totalCalories: 32450,
    weeklyWorkouts: 4,
    weeklyCalories: 2290,
    streak: 7,
  },
}

export async function GET(request: Request) {
  // In a real app, this would fetch data from your Django backend
  // Keeping this code commented for future use:
  // const apiUrl = process.env.DJANGO_API_URL || '';
  // if (apiUrl) {
  //   try {
  //     const response = await fetch(`${apiUrl}/profile/`, {
  //       headers: {
  //         'Authorization': `Bearer ${process.env.API_TOKEN || ''}`
  //       }
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       return NextResponse.json({ profile: data });
  //     }
  //   } catch (error) {
  //     console.error('API fetch error:', error);
  //     // Fall back to mock data on error
  //   }
  // }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({ profile: mockProfile })
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // In a real app, this would update data in your Django backend
    // Keeping this code commented for future use:
    // const apiUrl = process.env.DJANGO_API_URL || '';
    // if (apiUrl) {
    //   try {
    //     const response = await fetch(`${apiUrl}/profile/`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${process.env.API_TOKEN || ''}`
    //       },
    //       body: JSON.stringify(body)
    //     });
    //     if (response.ok) {
    //       const data = await response.json();
    //       return NextResponse.json({ profile: data });
    //     }
    //   } catch (error) {
    //     console.error('API update error:', error);
    //     // Fall back to mock behavior on error
    //   }
    // }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Update the mock profile
    const updatedProfile = {
      ...mockProfile,
      ...body,
    }

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

