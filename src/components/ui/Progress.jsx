import React from 'react';
import { twMerge } from 'tailwind-merge';

const Progress = ({ value = 0, color = 'blue', className, label }) => {
    return (
        <div className={twMerge('w-full', className)}>
            {label && (
                <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-400">{label}</span>
                    <span className="text-sm font-semibold text-indigo-400">{Math.round(value)}%</span>
                </div>
            )}
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                    className="h-full transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>
        </div>
    );
};

export default Progress;
