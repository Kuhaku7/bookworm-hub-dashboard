
// src/hooks/use-toast.ts
import { toast as sonnerToast } from 'sonner';

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

export const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  warning: (message: string) => sonnerToast.warning(message),
  info: (message: string) => sonnerToast.info(message),
  custom: (props: ToastProps) => {
    const { title, description, variant, action } = props;
    return sonnerToast(title, {
      description,
      action
    });
  }
};

export const useToast = () => {
  return toast;
};
