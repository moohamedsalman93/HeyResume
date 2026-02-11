import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const Navbar = ({ children, className, fullWidth, shadow = true, ...props }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={twMerge(
                'w-full transition-all duration-300 border-b border-transparent',
                isScrolled ? 'bg-white/80 backdrop-blur-md border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5',
                className
            )}
            {...props}
        >
            <div className={twMerge('mx-auto px-4 md:px-6', !fullWidth && 'max-w-7xl')}>
                {children}
            </div>
        </nav>
    );
};

export const NavBrand = ({ children, className, ...props }) => (
    <div className={twMerge('flex items-center gap-2', className)} {...props}>
        {children}
    </div>
);

export const NavContent = ({ children, className, ...props }) => (
    <div className={twMerge('hidden md:flex items-center gap-6', className)} {...props}>
        {children}
    </div>
);

export const NavMobile = ({ children, open, className, ...props }) => (
    <div
        className={twMerge(
            'md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 overflow-hidden transition-all duration-300',
            open ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0',
            className
        )}
        {...props}
    >
        <div className="flex flex-col gap-4 px-4">
            {children}
        </div>
    </div>
);

export default Navbar;
