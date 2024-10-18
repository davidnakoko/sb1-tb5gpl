"use client"

import { useToast } from './use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 right-0 p-4 space-y-4">
      {toasts.map((toast) => (
        <div key={toast.id} className="bg-white shadow-lg rounded-lg p-4 max-w-sm">
          {toast.title && <h3 className="font-semibold">{toast.title}</h3>}
          {toast.description && <p>{toast.description}</p>}
          {toast.action}
        </div>
      ))}
    </div>
  )
}