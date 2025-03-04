"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/user-management"
import { SystemSettings } from "@/components/system-settings"
import { ActivityLogs } from "@/components/activity-logs"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not an admin
    if (user && user.role !== "administrador") {
      router.push("/dashboard")
    }
  }, [user, router])

  if (user?.role !== "administrador") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Panel Administrativo</h1>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
          <TabsTrigger value="logs">Registros</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administra los usuarios del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>Configura los parámetros generales del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <SystemSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Registros de Actividad</CardTitle>
              <CardDescription>Historial de cambios y actividades en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityLogs />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

