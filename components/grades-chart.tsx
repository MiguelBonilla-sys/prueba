"use client"

import { useEffect, useRef } from "react"
import { useData } from "../context/data-context"

type GradesChartProps = {
  courseId: string
  period: string
}

export function GradesChart({ courseId, period }: GradesChartProps) {
  const { activities } = useData()
  const chartRef = useRef<HTMLDivElement>(null)

  // Filter activities by course and period
  const courseActivities = activities.filter(
    (activity) => activity.courseId === courseId && (period === "all" || activity.period === period),
  )

  useEffect(() => {
    if (chartRef.current && courseActivities.length > 0) {
      // In a real application, you would use a charting library like Chart.js or D3.js
      // For this prototype, we'll just display a simple placeholder
      renderPlaceholderChart()
    }
  }, [courseActivities.length]) // Only courseActivities.length is needed here

  const renderPlaceholderChart = () => {
    if (!chartRef.current) return

    const ctx = chartRef.current
    ctx.innerHTML = `
      <div class="flex flex-col items-center justify-center p-6 text-center">
        <svg width="200" height="150" viewBox="0 0 200 150">
          <rect x="10" y="10" width="30" height="140" fill="#3b82f6" />
          <rect x="50" y="30" width="30" height="120" fill="#3b82f6" />
          <rect x="90" y="50" width="30" height="100" fill="#3b82f6" />
          <rect x="130" y="20" width="30" height="130" fill="#3b82f6" />
          <rect x="170" y="40" width="30" height="110" fill="#3b82f6" />
        </svg>
        <p class="mt-4 text-sm text-muted-foreground">
          Gráfico de calificaciones para el curso seleccionado.
          <br />
          (En una aplicación real, se mostraría un gráfico interactivo)
        </p>
      </div>
    `
  }

  if (courseActivities.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
        <p className="text-center text-gray-500">No hay actividades para mostrar en el gráfico.</p>
      </div>
    )
  }

  return (
    <div ref={chartRef} className="h-[300px] w-full">
      {/* Chart will be rendered here */}
    </div>
  )
}

