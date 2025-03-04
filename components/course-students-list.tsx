"use client"

import { useState } from "react"
import { useData } from "../context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserPlus, UserMinus, Mail } from "lucide-react"

type CourseStudentsListProps = {
  courseId: string
}

export function CourseStudentsList({ courseId }: CourseStudentsListProps) {
  const { getCourse } = useData()
  const [searchQuery, setSearchQuery] = useState("")

  const course = getCourse(courseId)

  // In a real app, this would fetch student details from an API
  const students = [
    { id: "student-1", name: "Juan Pérez", email: "juan@ejemplo.com", status: "activo" },
    { id: "student-2", name: "María López", email: "maria@ejemplo.com", status: "activo" },
    { id: "student-3", name: "Carlos Rodríguez", email: "carlos@ejemplo.com", status: "inactivo" },
  ].filter((student) => course?.students.includes(student.id))

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar estudiantes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Añadir Estudiante
        </Button>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <p className="text-center text-gray-500">No se encontraron estudiantes. Añada estudiantes al curso.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      student.status === "activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
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
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Enviar Mensaje</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <UserMinus className="mr-2 h-4 w-4" />
                        <span>Eliminar del Curso</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

