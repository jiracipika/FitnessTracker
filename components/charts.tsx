"use client"

import { Line, Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Common chart options
const commonOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
}

interface ChartProps {
  data: ChartData<any, any, any>
  height?: number
}

export function LineChart({ data, height = 400 }: ChartProps) {
  const options = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div style={{ height }}>
      <Line data={data} options={options} />
    </div>
  )
}

export function BarChart({ data, height = 400 }: ChartProps) {
  const options = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  )
}

export function PieChart({ data, height = 400 }: ChartProps) {
  const options = {
    ...commonOptions,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  return (
    <div style={{ height }}>
      <Pie data={data} options={options} />
    </div>
  )
}

