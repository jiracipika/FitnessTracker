import { NextResponse } from "next/server"

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

export async function GET(request: Request) {
  // In a real app, this would fetch data from your Django backend
  // Keeping this code commented for future use:
  // const apiUrl = process.env.DJANGO_API_URL || '';
  // if (apiUrl) {
  //   try {
  //     const response = await fetch(`${apiUrl}/social/feed/`, {
  //       headers: {
  //         'Authorization': `Bearer ${process.env.API_TOKEN || ''}`
  //       }
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       return NextResponse.json({ feed: data });
  //     }
  //   } catch (error) {
  //     console.error('API fetch error:', error);
  //     // Fall back to mock data on error
  //   }
  // }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({ feed: mockFeed })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.type || !body.caption) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would send data to your Django backend
    // Keeping this code commented for future use:
    // const apiUrl = process.env.DJANGO_API_URL || '';
    // if (apiUrl) {
    //   try {
    //     const response = await fetch(`${apiUrl}/social/feed/`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${process.env.API_TOKEN || ''}`
    //       },
    //       body: JSON.stringify(body)
    //     });
    //     if (response.ok) {
    //       const data = await response.json();
    //       return NextResponse.json({ post: data }, { status: 201 });
    //     }
    //   } catch (error) {
    //     console.error('API post error:', error);
    //     // Fall back to mock behavior on error
    //   }
    // }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Create a mock response with a new ID
    const newPost = {
      id: mockFeed.length + 1,
      user: {
        id: 1,
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
      ...body,
    }

    return NextResponse.json({ post: newPost }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

