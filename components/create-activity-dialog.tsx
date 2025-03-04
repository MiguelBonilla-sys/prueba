"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "../context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type CreateActivityDialogProps = {
  open: boolean
  onClose: () => void
  courseId?: string
}

export function CreateActivityDialog({ open, onClose, courseId }: CreateActivityDialogProps) {
  const { courses, createActivity } = useData()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("tarea")
  const [dueDate, setDueDate] = useState("")
  const [weight, setWeight] = useState("0.1")
  const [period, setPeriod] = useState("1")
  const [selectedCourseId, setSelectedCourseId] = useState(courseId || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createActivity({
      courseId: selectedCourseId,
      title,
      description,
      type,
      dueDate: new Date(dueDate).toISOString(),
      weight: Number.parseFloat(weight),
      period,
    })

    onClose()
    // Reset form
    setTitle("")
    setDescription("")
    setType("tarea")
    setDueDate("")
    setWeight("0.1")
    setPeriod("1")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Actividad</DialogTitle>
          <DialogDescription>
            Ingrese los detalles de la nueva actividad. Haga clic en guardar cuando termine.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {!courseId && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="courseId" className="text-right">
                  Curso
                </Label>
                <Select value={selectedCourseId} onValueChange={setSelectedCourseId} required>
                  <SelectTrigger id="courseId" className="col-span-3">
                    <SelectValue placeholder="Seleccionar curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="type" className="col-span-3">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tarea">Tarea</SelectItem>
                  <SelectItem value="examen">Examen</SelectItem>
                  <SelectItem value="proyecto">Proyecto</SelectItem>
                  <SelectItem value="taller">Taller</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Fecha de entrega
              </Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Peso
              </Label>
              <Select value={weight} onValueChange={setWeight} required>
                <SelectTrigger id="weight" className="col-span-3">
                  <SelectValue placeholder="Seleccionar peso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.05">5%</SelectItem>
                  <SelectItem value="0.1">10%</SelectItem>
                  <SelectItem value="0.15">15%</SelectItem>
                  <SelectItem value="0.2">20%</SelectItem>
                  <SelectItem value="0.25">25%</SelectItem>
                  <SelectItem value="0.3">30%</SelectItem>
                  <SelectItem value="0.4">40%</SelectItem>
                  <SelectItem value="0.5">50%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Corte
              </Label>
              <Select value={period} onValueChange={setPeriod} required>
                <SelectTrigger id="period" className="col-span-3">
                  <SelectValue placeholder="Seleccionar corte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Primer Corte (30%)</SelectItem>
                  <SelectItem value="2">Segundo Corte (30%)</SelectItem>
                  <SelectItem value="3">Tercer Corte (40%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar Actividad</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

