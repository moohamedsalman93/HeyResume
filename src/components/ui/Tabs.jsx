import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const Tabs = ({ value, onChange, children, className }) => {
    return (
        <div className={twMerge('w-full', className)}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { activeValue: value, onValueChange: onChange });
                }
                return child;
            })}
        </div>
    );
};

export const TabsHeader = ({ children, className, activeValue, onValueChange }) => {
    return (
        <div className={twMerge('flex p-1 bg-gray-100/80 rounded-xl relative', className)}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        isActive: child.props.value === activeValue,
                        onClick: () => onValueChange(child.props.value)
                    });
                }
                return child;
            })}
        </div>
    );
};

export const Tab = ({ children, value, isActive, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={twMerge(
                'flex-1 relative py-2 text-sm font-semibold rounded-lg transition-colors z-10',
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700',
                className
            )}
        >
            {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            {children}
        </button>
    );
};

export default Tabs;
