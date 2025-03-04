"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useData } from "@/context/data-context"
import { useNotification } from "@/context/notification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash2, Users, FileText } from "lucide-react"
import { CourseStudentsList } from "@/components/course-students-list"
import { CourseActivitiesList } from "@/components/course-activities-list"
import { CreateActivityDialog } from "@/components/create-activity-dialog"
import { EditCourseDialog } from "@/components/edit-course-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function CoursePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { user } = useAuth()
  const { getCourse, deleteCourse } = useData()
  const { showNotification } = useNotification()

  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateActivityDialog, setShowCreateActivityDialog] = useState(false)
  const [showEditCourseDialog, setShowEditCourseDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    // Fetch course data
    const courseData = getCourse(id)
    if (courseData) {
      setCourse(courseData)
    } else {
      // Course not found, redirect to courses page
      router.push("/dashboard/courses")
      showNotification({
        title: "Error",
        message: "El curso no existe o no tienes acceso",
        type: "error",
      })
    }
    setLoading(false)
  }, [id, getCourse, router, showNotification])

  const handleDeleteCourse = () => {
    deleteCourse(id)
    router.push("/dashboard/courses")
    showNotification({
      title: "Curso eliminado",
      message: "El curso ha sido eliminado correctamente",
      type: "success",
    })
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!course) {
    return null // Will redirect in useEffect
  }

  const canEdit = user?.role === "administrador" || (user?.role === "profesor" && course.professorId === user.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{course.name}</h1>
          <p className="text-gray-500">Código: {course.code}</p>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowEditCourseDialog(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="activities">
        <TabsList>
          <TabsTrigger value="activities">Actividades</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
          <TabsTrigger value="grades">Calificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Actividades Académicas</CardTitle>
                <CardDescription>Gestiona las actividades del curso</CardDescription>
              </div>
              {canEdit && (
                <Button onClick={() => setShowCreateActivityDialog(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nueva Actividad
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <CourseActivitiesList courseId={id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Estudiantes</CardTitle>
                <CardDescription>Estudiantes inscritos en el curso</CardDescription>
              </div>
              {canEdit && (
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Gestionar Estudiantes
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <CourseStudentsList courseId={id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Calificaciones</CardTitle>
                <CardDescription>Gestiona las calificaciones del curso</CardDescription>
              </div>
              {canEdit && (
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar Calificaciones
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {/* Grades management component will be implemented here */}
              <p>El componente de gestión de calificaciones se implementará aquí.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showCreateActivityDialog && (
        <CreateActivityDialog
          open={showCreateActivityDialog}
          onClose={() => setShowCreateActivityDialog(false)}
          courseId={id}
        />
      )}

      {showEditCourseDialog && (
        <EditCourseDialog open={showEditCourseDialog} onClose={() => setShowEditCourseDialog(false)} course={course} />
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán todas las actividades y calificaciones asociadas a este
              curso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourse} className="bg-destructive text-destructive-foreground">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

