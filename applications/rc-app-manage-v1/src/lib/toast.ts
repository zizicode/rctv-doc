import { toast, type ToastOptions } from 'react-hot-toast';

const defaultOptions: ToastOptions = {
  position: 'top-center',
  duration: 3000,
  style: {
    fontSize: '.8rem'
  }
};

const Toast = {
  success: (message: string, options: ToastOptions = {}) =>
    toast.success(message, { ...defaultOptions, ...options }),

  error: (message: string, options: ToastOptions = {}) =>
    toast.error(message, { ...defaultOptions, ...options }),

  info: (message: string, options: ToastOptions = {}) =>
    toast(message, { ...defaultOptions, ...options }),

  loading: (message: string, options: ToastOptions = {}) =>
    toast.loading(message, { ...defaultOptions, ...options }),

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: any) => string);
    },
    options: ToastOptions = {}
  ) =>
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    }, { ...defaultOptions, ...options }),
};

export default Toast;
