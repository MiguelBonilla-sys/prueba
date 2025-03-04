"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/components/use-toast"

// Define types
type NotificationType = "info" | "success" | "warning" | "error"

type Notification = {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  timestamp: Date
}

type NotificationToShow = {
  title: string
  message: string
  type: NotificationType
}

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  showNotification: (notification: NotificationToShow) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Provider component
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  // Calculate unread count
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Show a notification
  const showNotification = (notification: NotificationToShow) => {
    const newNotification: Notification = {
      id: uuidv4(),
      ...notification,
      read: false,
      timestamp: new Date(),
    }

    setNotifications((prevNotifications) => [newNotification, ...prevNotifications])

    // Show toast
    toast({
      message: notification.title,
      description: notification.message,
      type: notification.type === "error" ? "error" : notification.type,
    })
  }

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, read: true })))
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  const value = {
    notifications,
    unreadCount,
    showNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

// Custom hook to use notification context
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

