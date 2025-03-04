"use client"

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"

// Define types with more precise typing
type UserRole = "estudiante" | "profesor" | "administrador"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

type StoredUser = User & {
  password: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component with readonly props
export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User)
    }
    setIsLoading(false)

    // Add sample users if they don't exist
    const users = JSON.parse(localStorage.getItem("users") ?? "[]") as StoredUser[]
    if (users.length === 0) {
      const sampleUsers: StoredUser[] = [
        {
          id: "student-1",
          name: "Estudiante Ejemplo",
          email: "estudiante@ejemplo.com",
          password: "password123",
          role: "estudiante",
        },
        {
          id: "prof-1",
          name: "Profesor Ejemplo",
          email: "profesor@ejemplo.com",
          password: "password123",
          role: "profesor",
        },
        {
          id: "admin-1",
          name: "Admin Ejemplo",
          email: "admin@ejemplo.com",
          password: "password123",
          role: "administrador",
        },
      ]
      localStorage.setItem("users", JSON.stringify(sampleUsers))
    }
  }, [])

  // Memoized login function with useCallback
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("users") ?? "[]") as StoredUser[]
    const foundUser = users.find((u) => u.email === email)

    if (foundUser && foundUser.password === password) {
      // Create user object without password using Pick utility type
      const userWithoutPassword: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      }

      // Store user in state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }, [])

  // Memoized registration function with useCallback
  const register = useCallback(async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole
  ): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("users") ?? "[]") as StoredUser[]
    const userExists = users.some((u) => u.email === email)

    if (userExists) {
      return false
    }

    // Create new user
    const newUser: StoredUser = {
      id: uuidv4(),
      name,
      email,
      password,
      role,
    }

    // Add user to users array
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Initialize user data if needed
    initializeUserData(newUser.id, role)

    return true
  }, [])

  // Initialize user data
  const initializeUserData = (userId: string, role: UserRole) => {
    // Initialize student data if needed
    if (role === "estudiante") {
      // Add student to some default courses
      const courses = JSON.parse(localStorage.getItem("courses") ?? "[]") as Array<{
        id: string
        name: string
        code: string
        description: string
        professorId?: string
        students: string[]
      }>

      if (courses.length > 0) {
        // Add student to first course
        const updatedCourses = courses.map((course, index) => {
          if (index === 0) {
            return {
              ...course,
              students: [...course.students, userId],
            }
          }
          return course
        })
        localStorage.setItem("courses", JSON.stringify(updatedCourses))
      }
    }

    // Initialize professor data if needed
    if (role === "profesor") {
      // Create a default course for the professor
      const courses = JSON.parse(localStorage.getItem("courses") ?? "[]") as Array<{
        id: string
        name: string
        code: string
        description: string
        professorId?: string
        students: string[]
      }>

      const newCourse = {
        id: uuidv4(),
        name: "Curso de ejemplo",
        code: "CURSO101",
        description: "Curso de ejemplo para el profesor",
        professorId: userId,
        students: [],
      }
      courses.push(newCourse)
      localStorage.setItem("courses", JSON.stringify(courses))
    }
  }

  // Logout function
  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  // Memoize the value object to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  }), [user, isLoading, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}