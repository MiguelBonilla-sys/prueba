import Link from "next/link"
import { BookOpen, FileText, GraduationCap, BarChart2, Users, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <GraduationCap className="mr-2 h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Registro Académico</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#caracteristicas" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Características
            </Link>
            <Link href="#beneficios" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Beneficios
            </Link>
            <Link href="#testimonios" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Testimonios
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Sistema de Registro de <span className="text-primary">Actividades Académicas</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
              Gestiona cursos, actividades y calificaciones de manera eficiente con nuestra plataforma educativa
              integral.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="px-8">
                Comenzar Ahora
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="caracteristicas" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="mb-16 text-center text-3xl font-bold">Características Principales</h2>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-lg border bg-white p-8">
                <div className="mb-4 text-primary">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Gestión de Cursos</h3>
                <p className="mb-4 text-gray-600">
                  Crea y administra cursos con facilidad, asignando profesores y estudiantes.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Creación de cursos con información detallada
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Asignación de profesores y estudiantes
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Organización por periodos académicos
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="rounded-lg border bg-white p-8">
                <div className="mb-4 text-primary">
                  <FileText className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Actividades Académicas</h3>
                <p className="mb-4 text-gray-600">
                  Programa y gestiona diferentes tipos de actividades para cada curso.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Creación de exámenes, tareas, proyectos y más
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Programación con fechas de entrega
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Asignación de pesos para calificación final
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="rounded-lg border bg-white p-8">
                <div className="mb-4 text-primary">
                  <GraduationCap className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Calificaciones</h3>
                <p className="mb-4 text-gray-600">
                  Sistema completo para la gestión y visualización de calificaciones.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Registro de calificaciones por actividad
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Cálculo automático de promedios
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Visualización de progreso por cortes académicos
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="rounded-lg border bg-white p-8">
                <div className="mb-4 text-primary">
                  <BarChart2 className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Reportes y Estadísticas</h3>
                <p className="mb-4 text-gray-600">Genera informes detallados sobre el rendimiento académico.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Informes por estudiante, curso o periodo
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Estadísticas de rendimiento académico
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Exportación en diferentes formatos
                  </li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="rounded-lg border bg-white p-8">
                <div className="mb-4 text-primary">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Gestión de Usuarios</h3>
                <p className="mb-4 text-gray-600">Administra diferentes tipos de usuarios con roles específicos.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Roles para administradores, profesores y estudiantes
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Permisos personalizados por rol
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Gestión de perfiles de usuario
                  </li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="rounded-lg border bg-white p-8">
                <div className="mb-4 text-primary">
                  <Bell className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Notificaciones</h3>
                <p className="mb-4 text-gray-600">Sistema de notificaciones para mantener informados a los usuarios.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Alertas sobre fechas de entrega
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Notificaciones de nuevas calificaciones
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">•</span>
                    Recordatorios personalizables
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2024 Registro Académico. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

