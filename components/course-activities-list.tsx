"use client"
import { useAuth } from "@/context/auth-context"
import { useData } from "../context/data-context"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"

type CourseActivitiesListProps = {
  courseId: string
}

export function CourseActivitiesList({ courseId }: CourseActivitiesListProps) {
  const { user } = useAuth()
  const { activities, getCourse } = useData()

  const course = getCourse(courseId)
  const courseActivities = activities.filter((activity) => activity.courseId === courseId)

  // Check if user can edit activities
  const canEdit = user?.role === "administrador" || (user?.role === "profesor" && course?.professorId === user.id)

  return (
    <div className="space-y-4">
      {courseActivities.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <p className="text-center text-gray-500">
            No hay actividades para este curso. {canEdit && "¡Crea una nueva actividad!"}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha de Entrega</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead>Corte</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseActivities.map((activity) => {
              const dueDate = new Date(activity.dueDate)
              return (
                <TableRow key={activity.id}>
                  <TableCell>{activity.title}</TableCell>
                  <TableCell className="capitalize">{activity.type}</TableCell>
                  <TableCell>
                    {dueDate.toLocaleDateString()}{" "}
                    {dueDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </TableCell>
                  <TableCell>{activity.weight * 100}%</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {activity.period === "1"
                        ? "Primer Corte"
                        : activity.period === "2"
                          ? "Segundo Corte"
                          : "Tercer Corte"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver Detalles</span>
                        </DropdownMenuItem>
                        {canEdit && (
                          <>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

