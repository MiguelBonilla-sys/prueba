"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search } from "lucide-react"
import { ActivityCard } from "@/components/activity-card"
import { CreateActivityDialog } from "@/components/create-activity-dialog"

export default function ActivitiesPage() {
  const { user } = useAuth()
  const { activities: allActivities, courses, getStudentCourses, getProfessorCourses } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [userCourses, setUserCourses] = useState<any[]>([])
  const [filteredActivities, setFilteredActivities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Initialize user courses
  useEffect(() => {
    if (user) {
      const coursesData =
        user.role === "estudiante"
          ? getStudentCourses(user.id)
          : user.role === "profesor"
            ? getProfessorCourses(user.id)
            : courses

      setUserCourses(coursesData)
      setIsLoading(false)
    }
  }, [user, courses, getStudentCourses, getProfessorCourses])

  // Filter activities when dependencies change
  useEffect(() => {
    if (isLoading) return

    const userCourseIds = userCourses.map((course) => course.id)

    const filtered = allActivities.filter((activity) => {
      // Only show activities from user's courses
      if (!userCourseIds.includes(activity.courseId)) {
        return false
      }

      // Apply search filter
      const matchesSearch =
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Apply course filter
      const matchesCourse = courseFilter === "all" || activity.courseId === courseFilter

      // Apply status filter
      const today = new Date()
      const dueDate = new Date(activity.dueDate)
      const isPending = dueDate > today
      const isOverdue = dueDate < today

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" && isPending) ||
        (statusFilter === "completed" && !isPending) ||
        (statusFilter === "overdue" && isOverdue)

      return matchesSearch && matchesCourse && matchesStatus
    })

    setFilteredActivities(filtered)
  }, [allActivities, userCourses, searchQuery, courseFilter, statusFilter, isLoading])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Actividades</h1>
        {(user?.role === "profesor" || user?.role === "administrador") && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Actividad
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Actividades</CardTitle>
          <CardDescription>Actividades académicas de tus cursos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar actividades..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  {userCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="overdue">Vencidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
              <p className="text-center text-gray-500">
                No se encontraron actividades. {user?.role !== "estudiante" && "¡Crea una nueva!"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showCreateDialog && <CreateActivityDialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} />}
    </div>
  )
}

