import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge(
                'bg-surface-2/80 backdrop-blur-sm rounded-2xl border border-white/[0.06] shadow-lg shadow-black/20 hover:border-white/10 transition-all duration-300 overflow-hidden',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className, ...props }) => (
    <div className={twMerge('px-6 py-4 border-b border-white/[0.06]', className)} {...props}>
        {children}
    </div>
);

export const CardBody = ({ children, className, ...props }) => (
    <div className={twMerge('p-6', className)} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ children, className, ...props }) => (
    <div className={twMerge('px-6 py-4 bg-white/[0.02] border-t border-white/[0.06]', className)} {...props}>
        {children}
    </div>
);

export default Card;
