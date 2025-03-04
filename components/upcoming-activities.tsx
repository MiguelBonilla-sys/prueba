"use client"


import { useAuth } from "@/context/auth-context"
import { useData } from "../context/data-context"
import { Badge } from "@/components/ui/badge"


export function UpcomingActivities() {
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

  // Get upcoming activities from user's courses
  const today = new Date()
  const upcomingActivities = activities
    .filter((activity) => {
      const dueDate = new Date(activity.dueDate)
      return userCourseIds.includes(activity.courseId) && dueDate > today
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  // Get course name for each activity
  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    return course ? course.name : "Curso desconocido"
  }

  // Calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hoy"
    if (diffDays === 1) return "Mañana"
    return `${diffDays} días`
  }

  return (
    <div className="space-y-4">
      {upcomingActivities.length === 0 ? (
        <div className="text-center text-muted-foreground">No hay actividades próximas</div>
      ) : (
        upcomingActivities.map((activity) => (
          <div key={activity.id} className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{getCourseName(activity.courseId)}</p>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant="outline" className="mb-1">
                {getDaysRemaining(activity.dueDate)}
              </Badge>
              <p className="text-xs text-muted-foreground">{new Date(activity.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

