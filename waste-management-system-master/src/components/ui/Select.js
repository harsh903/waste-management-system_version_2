'use client';

import React, { forwardRef } from 'react';

const Select = forwardRef(({ 
  label,
  id,
  options = [],
  placeholder = 'Select an option',
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
      <select
        ref={ref}
        id={id}
        name={id}
        disabled={disabled}
        required={required}
        className={`input-field ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;