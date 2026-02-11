import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const buttonVariants = {
  primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-md hover:shadow-lg',
  secondary: 'bg-white text-blue-600 border border-blue-100 hover:bg-blue-50 shadow-sm',
  outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  type = 'button', 
  onClick, 
  disabled = false,
  ...props 
}) => {
  return (
    <button
      type={type}
      className={twMerge(
        'px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
        buttonVariants[variant],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
