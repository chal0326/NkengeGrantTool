import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', title, description, onClick }: CardProps) {
  const cardClasses = `bg-white rounded-lg shadow-md ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''} ${className}`;

  if (title || description) {
    return (
      <div className={cardClasses} onClick={onClick}>
        <div className="p-6">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
}