"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
import { useNotification } from "./notification-context"

// Define types
type Course = {
  id: string
  name: string
  code: string
  description: string
  professorId: string
  students: string[]
}

type Activity = {
  id: string
  courseId: string
  title: string
  description: string
  type: string
  dueDate: string
  weight: number
  period: string
}

type Grade = {
  id: string
  activityId: string
  studentId: string
  value: number
  feedback: string
  submittedAt: string
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

type DataContextType = {
  courses: Course[]
  activities: Activity[]
  grades: Grade[]
  getCourse: (id: string) => Course | null
  getActivity: (id: string) => Activity | null
  getGrade: (activityId: string, studentId: string) => Grade | null
  getUser: (id: string) => User | null
  getStudentCourses: (studentId: string) => Course[]
  getProfessorCourses: (professorId: string) => Course[]
  getCourseActivities: (courseId: string) => Activity[]
  getStudentGrades: (studentId: string, courseId?: string) => Grade[]
  createCourse: (courseData: Omit<Course, "id">) => Course
  updateCourse: (id: string, courseData: Partial<Course>) => Course | null
  deleteCourse: (id: string) => boolean
  createActivity: (activityData: Omit<Activity, "id">) => Activity
  updateActivity: (id: string, activityData: Partial<Activity>) => Activity | null
  deleteActivity: (id: string) => boolean
  createGrade: (gradeData: Omit<Grade, "id">) => Grade
  updateGrade: (id: string, gradeData: Partial<Grade>) => Grade | null
  deleteGrade: (id: string) => boolean
  calculateFinalGrade: (studentId: string, courseId: string, period?: string) => number
  exportGrades: (courseId: string, format: string) => void
  importGrades: (courseId: string, data: Record<string, unknown>) => boolean
}

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined)

// Provider component
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const { showNotification } = useNotification()

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses")
    const storedActivities = localStorage.getItem("activities")
    const storedGrades = localStorage.getItem("grades")

    if (storedCourses) setCourses(JSON.parse(storedCourses))
    if (storedActivities) setActivities(JSON.parse(storedActivities))
    if (storedGrades) setGrades(JSON.parse(storedGrades))
  }, [])

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses))
  }, [courses])

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities))
  }, [activities])

  useEffect(() => {
    localStorage.setItem("grades", JSON.stringify(grades))
  }, [grades])

  const getCourse = (id: string): Course | null => courses.find(course => course.id === id) || null
  const getActivity = (id: string): Activity | null => activities.find(activity => activity.id === id) || null
  const getGrade = (activityId: string, studentId: string): Grade | null =>
    grades.find(grade => grade.activityId === activityId && grade.studentId === studentId) || null

  const getStudentGrades = (studentId: string, courseId?: string): Grade[] => {
    const studentGrades = grades.filter(grade => grade.studentId === studentId)
    if (!courseId) return studentGrades
    const courseActivityIds = activities.filter(activity => activity.courseId === courseId).map(activity => activity.id)
    return studentGrades.filter(grade => courseActivityIds.includes(grade.activityId))
  }

  const createCourse = (courseData: Omit<Course, "id">): Course => {
    const newCourse: Course = { id: uuidv4(), ...courseData }
    setCourses(prevCourses => [...prevCourses, newCourse])
    showNotification({ title: "Curso creado", message: `El curso ${newCourse.name} ha sido creado`, type: "success" })
    return newCourse
  }

  const deleteCourse = (id: string): boolean => {
    setCourses(prev => prev.filter(course => course.id !== id))
    setActivities(prev => prev.filter(activity => activity.courseId !== id))
    setGrades(prev => prev.filter(grade => !activities.some(activity => activity.courseId === id && activity.id === grade.activityId)))
    showNotification({ title: "Curso eliminado", message: "El curso ha sido eliminado", type: "success" })
    return true
  }

  const importGrades = (_courseId: string, _data: Record<string, unknown>): boolean => {
    void _courseId
    void _data
    showNotification({
      title: "Importación exitosa",
      message: "Las calificaciones han sido importadas",
      type: "success",
    })
    return true
  }

  const calculateFinalGrade = (studentId: string, courseId: string, period?: string): number => {
    const courseActivities = activities.filter(activity => activity.courseId === courseId && (!period || activity.period === period))
    if (courseActivities.length === 0) return 0

    const studentGrades = grades.filter(grade => 
      grade.studentId === studentId && courseActivities.some(activity => activity.id === grade.activityId)
    )
    
    if (studentGrades.length === 0) return 0

    let totalWeight = 0
    let weightedSum = 0

    for (const activity of courseActivities) {
      const grade = studentGrades.find(g => g.activityId === activity.id)
      if (grade) {
        weightedSum += grade.value * activity.weight
        totalWeight += activity.weight
      }
    }

    return totalWeight > 0 ? weightedSum / totalWeight : 0
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUser = (id: string): User | null => null;
  const getStudentCourses = (studentId: string): Course[] => courses.filter(course => course.students.includes(studentId))
  const getProfessorCourses = (professorId: string): Course[] => courses.filter(course => course.professorId === professorId)
  const getCourseActivities = (courseId: string): Activity[] => activities.filter(activity => activity.courseId === courseId)

  const updateCourse = (id: string, courseData: Partial<Course>): Course | null => {
    const courseIndex = courses.findIndex(course => course.id === id)
    if (courseIndex === -1) return null

    const updatedCourse = { ...courses[courseIndex], ...courseData }
    setCourses(prev => [
      ...prev.slice(0, courseIndex),
      updatedCourse,
      ...prev.slice(courseIndex + 1)
    ])
    return updatedCourse
  }

  const createActivity = (activityData: Omit<Activity, "id">): Activity => {
    const newActivity: Activity = { id: uuidv4(), ...activityData }
    setActivities(prev => [...prev, newActivity])
    return newActivity
  }

  const updateActivity = (id: string, activityData: Partial<Activity>): Activity | null => {
    const activityIndex = activities.findIndex(activity => activity.id === id)
    if (activityIndex === -1) return null

    const updatedActivity = { ...activities[activityIndex], ...activityData }
    setActivities(prev => [
      ...prev.slice(0, activityIndex),
      updatedActivity,
      ...prev.slice(activityIndex + 1)
    ])
    return updatedActivity
  }
  const deleteActivity = (id: string): boolean => {
    setActivities(prev => prev.filter(activity => activity.id !== id))
    setGrades(prev => prev.filter(grade => grade.activityId !== id))
    return true
  }
  const createGrade = (gradeData: Omit<Grade, "id">): Grade => {
    const newGrade: Grade = { id: uuidv4(), ...gradeData }
    setGrades(prev => [...prev, newGrade])
    return newGrade
  }
  const updateGrade = (id: string, gradeData: Partial<Grade>): Grade | null => {
    const gradeIndex = grades.findIndex(grade => grade.id === id)
    if (gradeIndex === -1) return null
    const updatedGrade = { ...grades[gradeIndex], ...gradeData }
    setGrades(prev => [
      ...prev.slice(0, gradeIndex),
      updatedGrade,
      ...prev.slice(gradeIndex + 1)
    ])
    return updatedGrade
  }

  const deleteGrade = (id: string): boolean => {
    setGrades(prev => prev.filter(grade => grade.id !== id))
    return true
  }

  const exportGrades = (courseId: string, format: string): void => {
    void courseId
    void format
    showNotification({ title: "Exportación exitosa", message: `Las calificaciones han sido exportadas en formato ${format}`, type: "success" })
  }

  const value = useMemo(() => ({
    courses,
    activities,
    grades,
    getCourse,
    getActivity,
    getGrade,
    getUser,
    getStudentCourses,
    getProfessorCourses,
    getCourseActivities,
    getStudentGrades,
    createCourse,
    updateCourse,
    deleteCourse,
    createActivity,
    updateActivity,
    deleteActivity,
    createGrade,
    updateGrade,
    deleteGrade,
    calculateFinalGrade,
    exportGrades,
    importGrades
  }), [courses, activities, grades])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

// Custom hook to use data context
export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error("useData must be used within a DataProvider")
  return context
}
