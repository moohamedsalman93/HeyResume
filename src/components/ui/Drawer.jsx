import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

const Drawer = ({ open, onClose, children, placement = 'left', className }) => {
    const placements = {
        left: {
            initial: { x: '-100%' },
            animate: { x: 0 },
            exit: { x: '-100%' },
            className: 'left-0 h-full w-80 max-w-[80vw]',
        },
        right: {
            initial: { x: '100%' },
            animate: { x: 0 },
            exit: { x: '100%' },
            className: 'right-0 h-full w-80 max-w-[80vw]',
        },
        bottom: {
            initial: { y: '100%' },
            animate: { y: 0 },
            exit: { y: '100%' },
            className: 'bottom-0 w-full h-80 max-h-[80vh]',
        },
    };

    const pos = placements[placement];

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={pos.initial}
                        animate={pos.animate}
                        exit={pos.exit}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={twMerge(
                            'fixed z-[1000] bg-surface-1 border-r border-white/[0.06] shadow-2xl shadow-black/50 overflow-auto',
                            pos.className,
                            className
                        )}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-full transition-colors z-10"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Drawer;
