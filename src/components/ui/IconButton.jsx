import React from 'react';
import { twMerge } from 'tailwind-merge';

const IconButton = ({ children, onClick, className, variant = 'filled', color = 'white', ...props }) => {
    const variants = {
        filled: {
            white: 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/[0.06]',
            blue: 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/20',
            red: 'bg-red-500/90 text-white hover:bg-red-500 shadow-md shadow-red-500/20',
            green: 'bg-emerald-500/90 text-white hover:bg-emerald-500 shadow-md shadow-emerald-500/20',
        },
        outlined: {
            white: 'bg-transparent text-slate-400 border border-white/10 hover:bg-white/5 hover:text-slate-200',
            blue: 'bg-transparent text-blue-400 border border-blue-500/30 hover:bg-blue-500/10',
            red: 'bg-transparent text-red-400 border border-red-500/30 hover:bg-red-500/10',
            green: 'bg-transparent text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10',
        },
        ghost: {
            white: 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200',
            blue: 'bg-transparent text-blue-400 hover:bg-blue-500/10',
            red: 'bg-transparent text-red-400 hover:bg-red-500/10',
            green: 'bg-transparent text-emerald-400 hover:bg-emerald-500/10',
        }
    };

    const variantStyles = variants[variant] || variants.filled;
    const colorStyles = variantStyles[color] || variantStyles.white;

    return (
        <button
            onClick={onClick}
            className={twMerge(
                'p-2 rounded-xl transition-all duration-200 active:scale-90 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500/30',
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
