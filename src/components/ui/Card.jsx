import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge(
                'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className, ...props }) => (
    <div className={twMerge('px-6 py-4 border-b border-gray-50', className)} {...props}>
        {children}
    </div>
);

export const CardBody = ({ children, className, ...props }) => (
    <div className={twMerge('p-6', className)} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ children, className, ...props }) => (
    <div className={twMerge('px-6 py-4 bg-gray-50/30 border-t border-gray-50', className)} {...props}>
        {children}
    </div>
);

export default Card;
