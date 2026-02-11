import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

const Dialog = ({ open, handler, children, size = 'md', className }) => {
    const sizes = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        xxl: 'max-w-2xl',
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handler(false)}
                        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={twMerge(
                                'w-full bg-surface-2 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 pointer-events-auto overflow-hidden relative',
                                sizes[size],
                                className
                            )}
                        >
                            <button
                                onClick={() => handler(false)}
                                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                            {children}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export const DialogHeader = ({ children, className }) => (
    <div className={twMerge('px-6 py-4 border-b border-white/[0.06]', className)}>
        <h3 className="text-xl font-bold text-white">{children}</h3>
    </div>
);

export const DialogBody = ({ children, className }) => (
    <div className={twMerge('px-6 py-6', className)}>{children}</div>
);

export const DialogFooter = ({ children, className }) => (
    <div className={twMerge('px-6 py-4 bg-white/[0.02] border-t border-white/[0.06] flex justify-end gap-3', className)}>
        {children}
    </div>
);

export default Dialog;
