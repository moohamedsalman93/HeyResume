import React from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariants = {
  primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40',
  secondary: 'bg-surface-3 text-slate-200 border border-white/10 hover:bg-surface-4 hover:border-white/20',
  outline: 'bg-transparent border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400',
  ghost: 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200',
  danger: 'bg-red-500/90 text-white hover:bg-red-500 shadow-lg shadow-red-500/25',
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
