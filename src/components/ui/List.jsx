import React from 'react';
import { twMerge } from 'tailwind-merge';

export const List = ({ children, className }) => {
    return (
        <div className={twMerge('flex flex-col gap-1 w-full', className)}>
            {children}
        </div>
    );
};

export const ListItem = ({ children, className, onClick, active }) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                'px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-3',
                active
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                className
            )}
        >
            {children}
        </div>
    );
};

export default List;
