import React from 'react';
import { twMerge } from 'tailwind-merge';

const IconButton = ({ children, onClick, className, variant = 'filled', color = 'white', ...props }) => {
    const variants = {
        filled: {
            white: 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-100',
            blue: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
            red: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
            green: 'bg-green-500 text-white hover:bg-green-600 shadow-md',
        },
        outlined: {
            white: 'bg-transparent text-gray-400 border border-gray-200 hover:bg-gray-50',
            blue: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50',
            red: 'bg-transparent text-red-500 border border-red-500 hover:bg-red-50',
            green: 'bg-transparent text-green-500 border border-green-500 hover:bg-green-50',
        },
        ghost: {
            white: 'bg-transparent text-gray-400 hover:bg-gray-100',
            blue: 'bg-transparent text-blue-600 hover:bg-blue-50',
            red: 'bg-transparent text-red-500 hover:bg-red-50',
            green: 'bg-transparent text-green-500 hover:bg-green-50',
        }
    };

    const variantStyles = variants[variant] || variants.filled;
    const colorStyles = variantStyles[color] || variantStyles.white;

    return (
        <button
            onClick={onClick}
            className={twMerge(
                'p-2 rounded-xl transition-all duration-200 active:scale-90 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500/50',
                colorStyles,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;
