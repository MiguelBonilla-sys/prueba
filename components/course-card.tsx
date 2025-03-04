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

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/dashboard/courses/${course.id}`}>
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
  )
}

