"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useData } from "@/context/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { GradesTable } from "@/components/grades-table"
import { GradesChart } from "@/components/grades-chart"

export default function GradesPage() {
  const { user } = useAuth()
  const { courses, getStudentCourses, getProfessorCourses } = useData()
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [userCourses, setUserCourses] = useState<any[]>([])

  useEffect(() => {
    // Get courses based on user role
    let coursesData: any[] = []
    if (user?.role === "estudiante") {
      coursesData = getStudentCourses(user.id)
    } else if (user?.role === "profesor") {
      coursesData = getProfessorCourses(user.id)
    } else {
      coursesData = courses
    }

    setUserCourses(coursesData)

    // Set first course as selected by default if there are courses
    if (coursesData.length > 0 && !selectedCourse) {
      setSelectedCourse(coursesData[0].id)
    }
  }, [user, courses, getStudentCourses, getProfessorCourses, selectedCourse])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Calificaciones</h1>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Exportar Calificaciones
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Calificaciones</CardTitle>
          <CardDescription>
            {user?.role === "estudiante"
              ? "Visualiza tus calificaciones por curso y periodo académico"
              : "Gestiona las calificaciones de tus estudiantes"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <Select value={selectedCourse || ""} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                {userCourses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los cortes</SelectItem>
                <SelectItem value="1">Primer Corte (30%)</SelectItem>
                <SelectItem value="2">Segundo Corte (30%)</SelectItem>
                <SelectItem value="3">Tercer Corte (40%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!selectedCourse ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
              <p className="text-center text-gray-500">Selecciona un curso para ver las calificaciones</p>
            </div>
          ) : (
            <Tabs defaultValue="table">
              <TabsList className="mb-4">
                <TabsTrigger value="table">Tabla</TabsTrigger>
                <TabsTrigger value="chart">Gráfico</TabsTrigger>
              </TabsList>

              <TabsContent value="table">
                <GradesTable courseId={selectedCourse} period={selectedPeriod} />
              </TabsContent>

              <TabsContent value="chart">
                <GradesChart courseId={selectedCourse} period={selectedPeriod} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

