"use client"

import { useAuth } from "@/context/auth-context"
import { useData } from "../context/data-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type GradesTableProps = {
  courseId: string
  period: string
}

export function GradesTable({ courseId, period }: GradesTableProps) {
  const { user } = useAuth()
  const { activities, getGrade, getCourse, getUser } = useData()

  // Filter activities by course and period
  const courseActivities = activities.filter(
    (activity) => activity.courseId === courseId && (period === "all" || activity.period === period),
  )

  // If user is a student, only show their grades
  const studentsToShow = user?.role === "estudiante" ? [user.id] : getCourse(courseId)?.students || []

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Estudiante</TableHead>
          {courseActivities.map((activity) => (
            <TableHead key={activity.id}>{activity.title}</TableHead>
          ))}
          <TableHead>Promedio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentsToShow.map((studentId) => (
          <TableRow key={studentId}>
            <TableCell>{getUser(studentId)?.name || "Estudiante"}</TableCell>
            {courseActivities.map((activity) => {
              const grade = getGrade(activity.id, studentId)
              return <TableCell key={activity.id}>{grade ? grade.value.toFixed(2) : "N/A"}</TableCell>
            })}
            <TableCell>
              {calculateAverage(
                courseActivities.map((activity) => getGrade(activity.id, studentId)?.value || 0),
              ).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function calculateAverage(grades: number[]): number {
  if (grades.length === 0) return 0
  const sum = grades.reduce((acc, grade) => acc + grade, 0)
  return sum / grades.length
}

