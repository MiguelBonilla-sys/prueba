import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/auth-context"
import { DataProvider } from "@/context/data-context"
import { NotificationProvider } from "@/context/notification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Registro de Actividades Académicas",
  description: "Aplicación para gestionar actividades académicas y calificaciones",
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

