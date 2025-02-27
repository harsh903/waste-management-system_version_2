'use client';

import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  disabled = false, 
  type = 'button',
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;