// This file should have a .tsx extension for JSX support
// Export the hook interface for use in other components
export interface ToastConfig {
  type?: 'info' | 'success' | 'error' | 'warning';
  message: string;
  description?: string;
  duration?: number;
}

export interface Toast extends ToastConfig {
  id: string;
}

export interface UseToastReturn {
  toast: (config: ToastConfig) => void;
}

export function useToast(): UseToastReturn {
  const toast = (config: ToastConfig): void => {
    // Generate a unique ID
    const id = Math.random().toString(36).substring(2, 9);

    // Create toast data
    const toastConfig: Toast = {
      id,
      type: config.type || 'info',
      message: config.message,
      description: config.description || '',
      duration: config.duration || 3000
    };

    // This is just a placeholder implementation
    // The actual implementation would integrate with the UI toast system
    console.log("Toast displayed:", toastConfig);
  };

  return { toast };
}