import React from 'react';
import { twMerge } from 'tailwind-merge';

const Textarea = ({
    label,
    error,
    className,
    containerClassName,
    labelClassName,
    id,
    rows = 4,
    ...props
}) => {
    const textareaId = id || React.useId();

    return (
        <div className={twMerge('flex flex-col gap-1.5 w-full', containerClassName)}>
            {label && (
                <label
                    htmlFor={textareaId}
                    className={twMerge('text-sm font-medium text-gray-700 ml-1', labelClassName)}
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                rows={rows}
                className={twMerge(
                    'px-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-200',
                    'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
                    'disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none',
                    error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-500 ml-1 mt-0.5">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Textarea;
