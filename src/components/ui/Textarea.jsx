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
                    className={twMerge('text-sm font-medium text-slate-400 ml-1', labelClassName)}
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                rows={rows}
                className={twMerge(
                    'px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-200 text-slate-200',
                    'placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 focus:bg-white/[0.07]',
                    'disabled:opacity-40 disabled:cursor-not-allowed resize-none',
                    error && 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/50',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-400 ml-1 mt-0.5">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Textarea;
