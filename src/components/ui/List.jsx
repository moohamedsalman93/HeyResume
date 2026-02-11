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
                    ? 'bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
                className
            )}
        >
            {children}
        </div>
    );
};

export default List;
