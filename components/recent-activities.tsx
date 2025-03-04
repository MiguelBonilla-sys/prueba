"use client"

import { useAuth } from "@/context/auth-context"
import { useData } from "../context/data-context"

export function RecentActivities() {
  const { user } = useAuth()
  const { activities, courses, getStudentCourses, getProfessorCourses } = useData()

  // Get user's courses based on role
  const userCourses =
    user?.role === "estudiante"
      ? getStudentCourses(user.id)
      : user?.role === "profesor"
        ? getProfessorCourses(user.id)
        : courses

  // Get course IDs for filtering
  const userCourseIds = userCourses.map((course) => course.id)

  // Get recent activities from user's courses
  const recentActivities = activities
    .filter((activity) => userCourseIds.includes(activity.courseId))
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
    .slice(0, 5)

  // Get course name for each activity
  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    return course ? course.name : "Curso desconocido"
  }

  return (
    <div className="space-y-4">
      {recentActivities.length === 0 ? (
        <div className="text-center text-muted-foreground">No hay actividades recientes</div>
      ) : (
        recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              {activity.type.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">
                {getCourseName(activity.courseId)} - {new Date(activity.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

