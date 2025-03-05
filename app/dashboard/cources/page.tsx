"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search } from "lucide-react"
import { CourseCard } from "@/components/course-card"
import { CreateCourseDialog } from "@/components/create-course-dialog"

export default function CoursesPage() {
  const { user } = useAuth()
  const { courses, getStudentCourses, getProfessorCourses } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Get courses based on user role
  const userCourses =
    user?.role === "estudiante"
      ? getStudentCourses(user.id)
      : user?.role === "profesor"
        ? getProfessorCourses(user.id)
        : courses

  // Filter courses when dependencies change
  useState(() => {
    if (isLoading) return

    const filtered = userCourses.filter((course) => {
      // Apply search filter
      const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Apply status filter (in a real app, courses might have a status property)
      const matchesStatus = statusFilter === "all" || true // Placeholder for status filtering

      return matchesSearch && matchesStatus
    })

    setFilteredCourses(filtered)
    setIsLoading(false)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
        {(user?.role === "profesor" || user?.role === "administrador") && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Curso
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Cursos</CardTitle>
          <CardDescription>Administra los cursos académicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar cursos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {userCourses.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
              <p className="text-center text-gray-500">
                No se encontraron cursos.{" "}
                {(user?.role === "profesor" || user?.role === "administrador") && "¡Crea uno nuevo!"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showCreateDialog && <CreateCourseDialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} />}
    </div>
  )
}

