"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  GraduationCap,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart2,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Cursos",
      icon: BookOpen,
      href: "/dashboard/courses",
      active: pathname.startsWith("/dashboard/courses"),
    },
    {
      label: "Actividades",
      icon: FileText,
      href: "/dashboard/activities",
      active: pathname.startsWith("/dashboard/activities"),
    },
    {
      label: "Calificaciones",
      icon: GraduationCap,
      href: "/dashboard/grades",
      active: pathname.startsWith("/dashboard/grades"),
    },
    {
      label: "Reportes",
      icon: BarChart2,
      href: "/dashboard/reports",
      active: pathname.startsWith("/dashboard/reports"),
      role: ["profesor", "administrador"],
    },
    {
      label: "Administración",
      icon: Settings,
      href: "/dashboard/admin",
      active: pathname.startsWith("/dashboard/admin"),
      role: ["administrador"],
    },
  ]

  // Filter routes based on user role
  const filteredRoutes = routes.filter((route) => !route.role || (user && route.role.includes(user.role)))

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-r bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 font-bold transition-opacity",
            collapsed ? "opacity-0" : "opacity-100",
          )}
        >
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className={cn("transition-opacity", collapsed ? "opacity-0" : "opacity-100")}>Registro Académico</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {filteredRoutes.map((route, i) => (
            <Link
              key={i}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-secondary",
                route.active ? "bg-secondary text-primary" : "text-muted-foreground",
                collapsed ? "justify-center" : "",
              )}
            >
              <route.icon className="h-5 w-5" />
              <span className={cn("transition-opacity", collapsed ? "hidden" : "block")}>{route.label}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className={cn("transition-opacity", collapsed ? "hidden" : "block")}>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

