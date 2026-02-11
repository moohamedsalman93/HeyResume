import React from 'react';
import { twMerge } from 'tailwind-merge';

const variants = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight',
    h2: 'text-3xl md:text-4xl font-bold tracking-tight',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl md:text-2xl font-semibold',
    h5: 'text-lg md:text-xl font-semibold',
    h6: 'text-base md:text-lg font-semibold',
    lead: 'text-lg md:text-xl text-gray-600 font-medium leading-relaxed',
    body: 'text-base text-gray-600 leading-relaxed',
    small: 'text-sm text-gray-500',
    tiny: 'text-xs text-gray-400 font-medium uppercase tracking-wider',
};

const Typography = ({
    children,
    variant = 'body',
    color = 'blue-gray',
    className,
    as,
    ...props
}) => {
    const Component = as || (variant.startsWith('h') ? variant : 'p');

    // Mapping color to tailwind classes if needed, for now just custom className support
    // or simple blue-gray mapping
    const colorClass = color === 'blue-gray' ? 'text-slate-800' : '';

    return (
        <Component
            className={twMerge(
                variants[variant],
                colorClass,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Typography;
