"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useData } from "../context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Course = {
  id: string
  name: string
  code: string
  description: string
  professorId: string
  students: string[]
}

type EditCourseDialogProps = {
  open: boolean
  onClose: () => void
  course: Course
}

export function EditCourseDialog({ open, onClose, course }: EditCourseDialogProps) {
  const { updateCourse } = useData()
  const [name, setName] = useState(course.name)
  const [code, setCode] = useState(course.code)
  const [description, setDescription] = useState(course.description)

  // Update form when course changes
  useEffect(() => {
    setName(course.name)
    setCode(course.code)
    setDescription(course.description)
  }, [course])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateCourse(course.id, {
      name,
      code,
      description,
    })

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Curso</DialogTitle>
          <DialogDescription>Modifique los detalles del curso. Haga clic en guardar cuando termine.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Código
              </Label>
              <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

