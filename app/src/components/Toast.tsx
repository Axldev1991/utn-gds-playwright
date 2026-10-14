import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  durationMs?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  durationMs = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onClose]);

  const icons: Record<string, string> = {
    success: '✅',
    info: 'ℹ️',
    error: '❌',
  };

  return (
    <div
      className={`toast-notification toast-${type}`}
      role="status"
      aria-label="Notificación del sistema"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="toast-icon">{icons[type] || '🔔'}</span>
      <span className="toast-message">{message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>
  );
};
