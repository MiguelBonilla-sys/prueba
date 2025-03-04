import Link from "next/link"
import { useData } from "../context/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

type Activity = {
  id: string
  courseId: string
  title: string
  description: string
  type: string
  dueDate: string
  weight: number
  period: string
}

export function ActivityCard({ activity }: { activity: Activity }) {
  const { getCourse } = useData()
  const course = getCourse(activity.courseId)

  // Format date
  const dueDate = new Date(activity.dueDate)
  const isOverdue = dueDate < new Date()
  const isPending = dueDate > new Date()

  // Get status badge
  const getStatusBadge = () => {
    if (isOverdue) {
      return <Badge variant="destructive">Vencida</Badge>
    } else if (isPending) {
      return <Badge variant="outline">Pendiente</Badge>
    } else {
      return <Badge variant="secondary">Completada</Badge>
    }
  }

  return (
    <Link href={`/dashboard/activities/${activity.id}`}>
      <Card className="hover:bg-accent transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{activity.title}</CardTitle>
            {getStatusBadge()}
          </div>
          <CardDescription>{course?.name || "Curso desconocido"}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{activity.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {dueDate.toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {dueDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div>Peso: {activity.weight * 100}%</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

