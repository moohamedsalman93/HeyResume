import React from 'react';
import { twMerge } from 'tailwind-merge';

const Checkbox = ({ label, className, containerClassName, id, ...props }) => {
    const checkboxId = id || React.useId();

    return (
        <div className={twMerge('flex items-center gap-2 group cursor-pointer', containerClassName)}>
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    id={checkboxId}
                    className={twMerge(
                        'peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
                        className
                    )}
                    {...props}
                />
                <span className="pointer-events-none absolute left-1 top-1 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </span>
            </div>
            {label && (
                <label
                    htmlFor={checkboxId}
                    className="cursor-pointer text-sm font-medium text-gray-700 select-none group-hover:text-blue-600 transition-colors"
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
