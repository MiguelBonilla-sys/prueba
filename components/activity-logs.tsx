"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download } from "lucide-react"

export function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  // In a real app, this would come from an API
  const logs = [
    {
      id: "1",
      user: "Juan Pérez",
      action: "login",
      description: "Inicio de sesión exitoso",
      timestamp: "2023-05-10T08:30:00Z",
      ip: "192.168.1.1",
    },
    {
      id: "2",
      user: "María López",
      action: "create",
      description: "Creó un nuevo curso: Matemáticas Avanzadas",
      timestamp: "2023-05-10T09:15:00Z",
      ip: "192.168.1.2",
    },
    {
      id: "3",
      user: "Carlos Rodríguez",
      action: "update",
      description: "Actualizó la calificación del estudiante Ana Martínez",
      timestamp: "2023-05-10T10:45:00Z",
      ip: "192.168.1.3",
    },
    {
      id: "4",
      user: "Ana Martínez",
      action: "delete",
      description: "Eliminó una actividad: Taller de Ecuaciones",
      timestamp: "2023-05-10T11:30:00Z",
      ip: "192.168.1.4",
    },
  ]

  const filteredLogs = logs.filter(
    (log) =>
      (log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (actionFilter === "all" || log.action === actionFilter),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar registros..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por acción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las acciones</SelectItem>
              <SelectItem value="login">Inicio de sesión</SelectItem>
              <SelectItem value="create">Creación</SelectItem>
              <SelectItem value="update">Actualización</SelectItem>
              <SelectItem value="delete">Eliminación</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Acción</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha y Hora</TableHead>
            <TableHead>Dirección IP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.user}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    log.action === "login"
                      ? "bg-blue-100 text-blue-800"
                      : log.action === "create"
                        ? "bg-green-100 text-green-800"
                        : log.action === "update"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {log.action === "login"
                    ? "Inicio de sesión"
                    : log.action === "create"
                      ? "Creación"
                      : log.action === "update"
                        ? "Actualización"
                        : "Eliminación"}
                </span>
              </TableCell>
              <TableCell>{log.description}</TableCell>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{log.ip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

