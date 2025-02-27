import React from 'react';

const Card = ({ 
  children, 
  title, 
  description,
  footer,
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-card overflow-hidden ${className}`}
      {...props}
    >
      {(title || description) && (
        <div className="p-6 border-b border-gray-200">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">{footer}</div>}
    </div>
  );
};

export default Card;