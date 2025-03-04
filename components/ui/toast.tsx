import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type ToastType = 'info' | 'success' | 'error';

interface ToastData {
  type: ToastType;
  message: string;
  description: string;
}

const ToastDemo = () => {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (type: ToastType, message: string, description: string) => {
    setToast({ type, message, description });

    // Automatically clear toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
          <Alert
            variant={toast.type === 'error' ? 'destructive' : 'default'}
            className="animate-in slide-in-from-right"
          >
            <AlertTitle>{toast.message}</AlertTitle>
            <AlertDescription>{toast.description}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="space-y-4">
        <Button
          onClick={() => showToast('info', 'Hello', 'This is a basic toast notification')}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Show Basic Toast
        </Button>

        <Button
          onClick={() => showToast('success', 'Success!', 'Your action was completed successfully')}
          className="w-full bg-green-500 text-white hover:bg-green-600"
        >
          Show Success Toast
        </Button>

        <Button
          onClick={() => showToast('error', 'Error', 'Something went wrong')}
          className="w-full bg-red-500 text-white hover:bg-red-600"
        >
          Show Error Toast
        </Button>
      </div>
    </div>
  )
}

export default ToastDemo
