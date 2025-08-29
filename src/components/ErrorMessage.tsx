import type { FC } from 'react';

interface ErrorMessageProps {
  message: string;
  type?: 'default' | 'full-width' | 'compact';
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({
  message,
  type = 'default',
  onRetry,
  className = ''
}) => {
  const baseClass = 'error-message';
  const typeClass = `error-message--${type}`;
  
  return (
    <div className={`${baseClass} ${typeClass} ${className}`} role="alert">
      <div className="error-message__content">
        <svg 
          className="error-message__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
        <p className="error-message__text">{message}</p>
      </div>
      {onRetry && (
        <button
          className="error-message__retry"
          onClick={onRetry}
          aria-label="Попробовать снова"
        >
          Повторить
        </button>
      )}
    </div>
  );
};