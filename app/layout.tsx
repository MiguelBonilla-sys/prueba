import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/auth-context"
import { NotificationProvider } from "@/context/notification-context"
import { DataProvider } from "@/context/data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Registro Académico - Sistema de Gestión de Actividades",
  description: "Plataforma para la gestión de cursos, actividades académicas y calificaciones",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            <DataProvider>
              {children}
              <Toaster />
            </DataProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

