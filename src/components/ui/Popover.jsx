import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const Popover = ({ children, placement = 'bottom' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={containerRef}>
            {React.Children.map(children, child => {
                if (child.type === PopoverHandler) {
                    return React.cloneElement(child, { onClick: () => setIsOpen(!isOpen) });
                }
                if (child.type === PopoverContent) {
                    return (
                        <AnimatePresence>
                            {isOpen && React.cloneElement(child, { placement })}
                        </AnimatePresence>
                    );
                }
                return child;
            })}
        </div>
    );
};

export const PopoverHandler = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className="cursor-pointer">
            {children}
        </div>
    );
};

export const PopoverContent = ({ children, className, placement = 'bottom' }) => {
    const placementClasses = {
        'bottom': 'top-full mt-2 left-1/2 -translate-x-1/2',
        'bottom-start': 'top-full mt-2 left-0',
        'bottom-end': 'top-full mt-2 right-0',
        'top': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className={twMerge(
                'absolute z-[999] bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[12rem]',
                placementClasses[placement],
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export default Popover;
