import React from 'react';
import { twMerge } from 'tailwind-merge';

const Progress = ({ value = 0, color = 'blue', className, label }) => {
    const colors = {
        blue: 'bg-blue-600',
        indigo: 'bg-indigo-600',
        green: 'bg-green-600',
        red: 'bg-red-600',
    };

    return (
        <div className={twMerge('w-full', className)}>
            {label && (
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm font-medium text-gray-700">{Math.round(value)}%</span>
                </div>
            )}
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                    className={twMerge('h-full transition-all duration-500 rounded-full', colors[color] || colors.blue)}
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>
        </div>
    );
};

export default Progress;
