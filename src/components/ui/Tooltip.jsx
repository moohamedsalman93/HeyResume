import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Tooltip = ({ children, content, className, placement = 'top' }) => {
    const [isVisible, setIsVisible] = useState(false);

    const placementClasses = {
        'top': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
        'bottom': 'top-full mt-2 left-1/2 -translate-x-1/2',
        'left': 'right-full mr-2 top-1/2 -translate-y-1/2',
        'right': 'left-full ml-2 top-1/2 -translate-y-1/2',
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={twMerge(
                            'absolute z-[9999] px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded shadow-lg whitespace-nowrap pointer-events-none',
                            placementClasses[placement],
                            className
                        )}
                    >
                        {content}
                        <div className={twMerge(
                            'absolute w-2 h-2 bg-gray-900 rotate-45',
                            placement === 'top' && 'top-full -mt-1 left-1/2 -translate-x-1/2',
                            placement === 'bottom' && 'bottom-full -mb-1 left-1/2 -translate-x-1/2',
                            placement === 'left' && 'left-full -ml-1 top-1/2 -translate-y-1/2',
                            placement === 'right' && 'right-full -mr-1 top-1/2 -translate-y-1/2',
                        )} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
