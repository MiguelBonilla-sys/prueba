"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useData } from "@/context/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentActivities } from "@/components/recent-activities"
import { UpcomingActivities } from "@/components/upcoming-activities"
import { GradesSummary } from "@/components/grades-summary"
import { CoursesList } from "@/components/courses-list"

export default function DashboardPage() {
  const { user } = useAuth()
  const { courses, activities, getStudentCourses, getProfessorCourses } = useData()
  const [userCourses, setUserCourses] = useState<any[]>([])

  useEffect(() => {
    // Get courses based on user role
    if (user?.role === "estudiante") {
      setUserCourses(getStudentCourses(user.id))
    } else if (user?.role === "profesor") {
      setUserCourses(getProfessorCourses(user.id))
    } else {
      setUserCourses(courses)
    }
  }, [user, courses, getStudentCourses, getProfessorCourses])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCourses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Actividades Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                activities.filter(
                  (a) => new Date(a.dueDate) > new Date() && userCourses.some((c) => c.id === a.courseId),
                ).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.role === "estudiante" ? "4.2" : "N/A"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Corte Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="courses">Mis Cursos</TabsTrigger>
          <TabsTrigger value="activities">Actividades</TabsTrigger>
          <TabsTrigger value="grades">Calificaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Actividades Recientes</CardTitle>
                <CardDescription>Últimas actividades registradas en tus cursos</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Próximas Entregas</CardTitle>
                <CardDescription>Actividades con fecha de entrega próxima</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingActivities />
              </CardContent>
            </Card>
          </div>
          {user?.role === "estudiante" && (
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Calificaciones</CardTitle>
                <CardDescription>Calificaciones por corte académico</CardDescription>
              </CardHeader>
              <CardContent>
                <GradesSummary />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Mis Cursos</CardTitle>
              <CardDescription>
                Listado de cursos en los que estás {user?.role === "estudiante" ? "inscrito" : "enseñando"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CoursesList courses={userCourses} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Actividades Académicas</CardTitle>
              <CardDescription>Todas las actividades de tus cursos</CardDescription>
            </CardHeader>
            <CardContent>{/* Activities content will be implemented in the component */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle>Calificaciones</CardTitle>
              <CardDescription>Detalle de calificaciones por curso y actividad</CardDescription>
            </CardHeader>
            <CardContent>{/* Grades content will be implemented in the component */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

