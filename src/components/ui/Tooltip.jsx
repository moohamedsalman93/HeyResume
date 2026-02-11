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
                            'absolute z-[9999] px-3 py-1.5 bg-surface-3 border border-white/10 text-slate-200 text-xs font-medium rounded-lg shadow-xl shadow-black/30 whitespace-nowrap pointer-events-none',
                            placementClasses[placement],
                            className
                        )}
                    >
                        {content}
                        <div className={twMerge(
                            'absolute w-2 h-2 bg-surface-3 border border-white/10 rotate-45',
                            placement === 'top' && 'top-full -mt-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0',
                            placement === 'bottom' && 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0',
                            placement === 'left' && 'left-full -ml-1 top-1/2 -translate-y-1/2 border-l-0 border-b-0',
                            placement === 'right' && 'right-full -mr-1 top-1/2 -translate-y-1/2 border-r-0 border-t-0',
                        )} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
