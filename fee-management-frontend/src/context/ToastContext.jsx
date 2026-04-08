import { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message) => addToast(message, 'success');
  const error = (message) => addToast(message, 'error');
  const warning = (message) => addToast(message, 'warning');
  const info = (message) => addToast(message, 'info');

  const value = {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-up min-w-[300px] ${
              toast.type === 'success' ? 'bg-green-500 text-white' :
              toast.type === 'error' ? 'bg-red-500 text-white' :
              toast.type === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto hover:opacity-75"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
