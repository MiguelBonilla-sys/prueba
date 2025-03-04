"use client"

import { useAuth } from "@/context/auth-context"
import { useData } from "../context/data-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function GradesSummary() {
  const { user } = useAuth()
  const { getStudentCourses, calculateFinalGrade } = useData()

  const studentCourses = user?.role === "estudiante" ? getStudentCourses(user.id) : []

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Curso</TableHead>
          <TableHead>Primer Corte (30%)</TableHead>
          <TableHead>Segundo Corte (30%)</TableHead>
          <TableHead>Tercer Corte (40%)</TableHead>
          <TableHead>Nota Final</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentCourses.map((course) => {
          const firstCutGrade = calculateFinalGrade(user!.id, course.id, "1")
          const secondCutGrade = calculateFinalGrade(user!.id, course.id, "2")
          const thirdCutGrade = calculateFinalGrade(user!.id, course.id, "3")
          const finalGrade = calculateFinalGrade(user!.id, course.id)

          return (
            <TableRow key={course.id}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{firstCutGrade.toFixed(2)}</TableCell>
              <TableCell>{secondCutGrade.toFixed(2)}</TableCell>
              <TableCell>{thirdCutGrade.toFixed(2)}</TableCell>
              <TableCell className="font-bold">{finalGrade.toFixed(2)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}