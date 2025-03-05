"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useData } from "@/context/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, FileText, Download, PieChart, LineChart } from "lucide-react"

export default function ReportsPage() {
  const { user } = useAuth()
  const { courses, getStudentCourses, getProfessorCourses } = useData()
  const [selectedReport, setSelectedReport] = useState("grades")
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [userCourses, setUserCourses] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  // Get user's courses based on role
  const coursesData =
    user?.role === "estudiante"
      ? getStudentCourses(user.id)
      : user?.role === "profesor"
        ? getProfessorCourses(user.id)
        : courses

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
        <Button variant="outline" onClick={handleGenerateReport} disabled={isGenerating}>
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? "Generando..." : "Exportar Reporte"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generación de Reportes</CardTitle>
          <CardDescription>
            Genera reportes personalizados sobre calificaciones, asistencia y rendimiento académico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Seleccionar tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grades">Reporte de Calificaciones</SelectItem>
                <SelectItem value="attendance">Reporte de Asistencia</SelectItem>
                <SelectItem value="performance">Rendimiento Académico</SelectItem>
                <SelectItem value="activities">Actividades por Curso</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCourse || ""} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los cursos</SelectItem>
                {coursesData.map((course) => (
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

          <Tabs defaultValue="preview">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Vista Previa</TabsTrigger>
              <TabsTrigger value="options">Opciones</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              <div className="rounded-lg border p-6">
                {selectedReport === "grades" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Vista Previa: Reporte de Calificaciones</h3>
                    <div className="flex justify-center">
                      <BarChart className="h-64 w-full max-w-lg text-primary opacity-70" />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Gráfico de calificaciones por estudiante y actividad
                    </p>
                  </div>
                )}

                {selectedReport === "attendance" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Vista Previa: Reporte de Asistencia</h3>
                    <div className="flex justify-center">
                      <PieChart className="h-64 w-full max-w-lg text-primary opacity-70" />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Gráfico de asistencia por estudiante y sesión
                    </p>
                  </div>
                )}

                {selectedReport === "performance" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Vista Previa: Rendimiento Académico</h3>
                    <div className="flex justify-center">
                      <LineChart className="h-64 w-full max-w-lg text-primary opacity-70" />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Gráfico de rendimiento académico a lo largo del tiempo
                    </p>
                  </div>
                )}

                {selectedReport === "activities" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Vista Previa: Actividades por Curso</h3>
                    <div className="flex justify-center">
                      <BarChart className="h-64 w-full max-w-lg text-primary opacity-70" />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">Gráfico de actividades por tipo y curso</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="options">
              <Card>
                <CardHeader>
                  <CardTitle>Opciones de Reporte</CardTitle>
                  <CardDescription>Personaliza la información incluida en el reporte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Formato de Exportación</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Excel
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        CSV
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Incluir en el Reporte</h3>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                        <span>Datos de estudiantes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                        <span>Calificaciones por actividad</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                        <span>Promedio general</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                        <span>Gráficos estadísticos</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

