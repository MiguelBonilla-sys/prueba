import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Course = {
  id: string
  name: string
  code: string
  description: string
  professorId: string
  students: string[]
}

export function CoursesList({ courses }: { courses: Course[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Link href={`/dashboard/courses/${course.id}`} key={course.id}>
          <Card className="hover:bg-accent transition-colors">
            <CardHeader className="pb-2">
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
              <Badge variant="secondary">{course.students.length} estudiantes</Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

