"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <GraduationCap className="mb-4 h-16 w-16 text-primary" />
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">404</h1>
      <h2 className="mb-6 text-2xl font-bold">Página no encontrada</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/">
          <Button className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Ir al inicio
          </Button>
        </Link>
        <Button variant="outline" onClick={handleGoBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver atrás
        </Button>
      </div>
    </div>
  )
}

