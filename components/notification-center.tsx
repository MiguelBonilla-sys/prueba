"use client"

import { useState } from "react"
import { useNotification } from "@/context/notification-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Bell, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotification()

  return (
    <>
      {/* Notification panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-80 transform border-l bg-white p-4 shadow-lg transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-semibold">Notificaciones</h2>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                <Check className="mr-1 h-3 w-3" />
                Marcar todas
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)] py-4">
          {notifications.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-center text-muted-foreground">
              No tienes notificaciones
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "relative rounded-lg border p-3 transition-colors",
                    notification.read ? "bg-white" : "bg-muted",
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                  {!notification.read && <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary"></div>}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t pt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={clearNotifications}
            disabled={notifications.length === 0}
          >
            Limpiar todas
          </Button>
        </div>
      </div>

      {/* Toggle button (only visible on mobile) */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg md:hidden"
        onClick={() => setOpen(!open)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Button>
    </>
  )
}

