import React from 'react';
import { twMerge } from 'tailwind-merge';

const variants = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white',
    h2: 'text-3xl md:text-4xl font-bold tracking-tight text-white',
    h3: 'text-2xl md:text-3xl font-bold text-white',
    h4: 'text-xl md:text-2xl font-semibold text-white',
    h5: 'text-lg md:text-xl font-semibold text-slate-100',
    h6: 'text-base md:text-lg font-semibold text-slate-200',
    lead: 'text-lg md:text-xl text-slate-400 font-medium leading-relaxed',
    body: 'text-base text-slate-400 leading-relaxed',
    small: 'text-sm text-slate-500',
    tiny: 'text-xs text-slate-600 font-medium uppercase tracking-wider',
};

const Typography = ({
    children,
    variant = 'body',
    color = 'default',
    className,
    as,
    ...props
}) => {
    const Component = as || (variant.startsWith('h') ? variant : 'p');

    return (
        <Component
            className={twMerge(
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Typography;
