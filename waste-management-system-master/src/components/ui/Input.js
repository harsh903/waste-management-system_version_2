'use client';

import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  id,
  type = 'text',
  placeholder = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`input-field ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;