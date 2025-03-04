"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SystemSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("es")
  const [academicPeriod, setAcademicPeriod] = useState("2023-2")

  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="academic">Académico</TabsTrigger>
        <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>Administre la configuración general del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Modo Oscuro</Label>
                <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <p className="text-sm text-muted-foreground">Activa el modo oscuro para reducir la fatiga visual</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Seleccionar idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="academic">
        <Card>
          <CardHeader>
            <CardTitle>Configuración Académica</CardTitle>
            <CardDescription>Administre la configuración académica del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="academicPeriod">Periodo Académico Actual</Label>
              <Select value={academicPeriod} onValueChange={setAcademicPeriod}>
                <SelectTrigger id="academicPeriod">
                  <SelectValue placeholder="Seleccionar periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-1">2023-1</SelectItem>
                  <SelectItem value="2023-2">2023-2</SelectItem>
                  <SelectItem value="2024-1">2024-1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minGrade">Nota Mínima Aprobatoria</Label>
              <Input id="minGrade" type="number" min="0" max="5" step="0.1" defaultValue="3.0" />
            </div>

            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Notificaciones</CardTitle>
            <CardDescription>Administre las notificaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <p className="text-sm text-muted-foreground">Enviar notificaciones por email a los usuarios</p>
            </div>

            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Seguridad</CardTitle>
            <CardDescription>Administre la seguridad del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="passwordPolicy">Política de Contraseñas</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="passwordPolicy">
                  <SelectValue placeholder="Seleccionar política" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja (mínimo 6 caracteres)</SelectItem>
                  <SelectItem value="medium">Media (mínimo 8 caracteres, 1 número)</SelectItem>
                  <SelectItem value="high">Alta (mínimo 10 caracteres, 1 número, 1 mayúscula, 1 símbolo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Tiempo de Inactividad (minutos)</Label>
              <Input id="sessionTimeout" type="number" min="5" defaultValue="30" />
            </div>

            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

