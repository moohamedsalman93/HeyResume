import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CalendarDateRangeIcon } from '@heroicons/react/24/solid';
import Typography from "./ui/Typography";
import { twMerge } from "tailwind-merge";

function DatePicker({ date, handleInputChange, field, index, title, isDisable }) {
    const [selectedMonthData, setSelectedMonthData] = useState({
        year: date ? Number(date.split('-')[1]) : 2024,
        monthName: date ? date.split('-')[0] : "Jan",
    });
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const inputRef = useRef(null);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsPickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const updateDate = (month, year) => {
        const newDate = month + '-' + year;
        handleInputChange(field, index)({ target: { value: newDate } });
        setSelectedMonthData({ monthName: month, year });
    };

    return (
        <div ref={inputRef} className="relative flex flex-col gap-1.5">
            <Typography variant="small" className="font-semibold text-gray-700 ml-1">
                {title}
            </Typography>

            <div className="relative">
                <div
                    onClick={() => !isDisable && setIsPickerOpen(!isPickerOpen)}
                    className={twMerge(
                        "cursor-pointer transition-all duration-200 border px-4 h-10 flex items-center rounded-xl text-gray-600 bg-white min-w-[10rem]",
                        isPickerOpen ? "border-blue-500 ring-4 ring-blue-500/10" : "border-gray-200 hover:border-gray-300",
                        isDisable && "opacity-50 cursor-not-allowed bg-gray-50 text-gray-400"
                    )}
                >
                    <Typography variant="body" className="font-medium text-inherit">
                        {isDisable ? "Present" : (date || "Select Date")}
                    </Typography>
                    <CalendarDateRangeIcon className="w-4 h-4 absolute right-4 text-gray-400" />
                </div>

                {isPickerOpen && (
                    <div className="bg-white min-w-[14rem] absolute border border-gray-100 shadow-2xl bottom-full mb-2 right-0 rounded-2xl z-[1001] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="select-none h-10 border-b border-gray-50 flex items-center justify-between px-4 bg-gray-50/50">
                            <button
                                onClick={(e) => { e.stopPropagation(); updateDate(selectedMonthData.monthName, selectedMonthData.year - 1); }}
                                className="p-1 hover:bg-white rounded-md transition-colors"
                            >
                                <ArrowLeftIcon className="h-4 w-4 text-gray-600" />
                            </button>
                            <Typography variant="small" className="font-bold text-gray-900">{selectedMonthData.year}</Typography>
                            <button
                                onClick={(e) => { e.stopPropagation(); updateDate(selectedMonthData.monthName, selectedMonthData.year + 1); }}
                                className="p-1 hover:bg-white rounded-md transition-colors"
                            >
                                <ArrowRightIcon className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                        <div className="grid grid-cols-3 p-2 gap-1 bg-white">
                            {monthNames.map((month, idx) => (
                                <button
                                    key={idx}
                                    className={twMerge(
                                        "text-xs py-2.5 rounded-lg flex items-center justify-center font-semibold transition-all duration-200",
                                        selectedMonthData.monthName === month
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateDate(month, selectedMonthData.year);
                                        setIsPickerOpen(false);
                                    }}
                                >
                                    {month}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DatePicker;

