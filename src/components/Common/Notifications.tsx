import { useEffect, useState } from 'react'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

let notifyFn: ((n: Notification) => void) | null = null

export function notify(notification: Omit<Notification, 'id'>) {
  notifyFn?.({ ...notification, id: crypto.randomUUID() })
}

export function NotificationContainer() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    notifyFn = (n: Notification) => {
      setNotifications((prev) => [...prev, n])
      setTimeout(() => {
        setNotifications((prev) => prev.filter((x) => x.id !== n.id))
      }, n.duration || 4000)
    }
    return () => { notifyFn = null }
  }, [])

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-4 py-3 rounded-lg text-sm shadow-lg border ${
            n.type === 'success' ? 'bg-[#00c853]/10 border-[#00c853]/30 text-[#00c853]' :
            n.type === 'error' ? 'bg-[#ff444f]/10 border-[#ff444f]/30 text-[#ff444f]' :
            n.type === 'warning' ? 'bg-[#ffa726]/10 border-[#ffa726]/30 text-[#ffa726]' :
            'bg-[#06b2d6]/10 border-[#06b2d6]/30 text-[#06b2d6]'
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  )
}
