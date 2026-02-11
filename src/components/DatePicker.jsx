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
            <Typography variant="small" className="font-semibold text-slate-400 ml-1">
                {title}
            </Typography>

            <div className="relative">
                <div
                    onClick={() => !isDisable && setIsPickerOpen(!isPickerOpen)}
                    className={twMerge(
                        "cursor-pointer transition-all duration-200 border px-4 h-10 flex items-center rounded-xl text-slate-300 bg-white/5 min-w-[10rem]",
                        isPickerOpen ? "border-indigo-500/50 ring-4 ring-indigo-500/10" : "border-white/10 hover:border-white/20",
                        isDisable && "opacity-40 cursor-not-allowed text-slate-500"
                    )}
                >
                    <Typography variant="body" className="font-medium text-inherit">
                        {isDisable ? "Present" : (date || "Select Date")}
                    </Typography>
                    <CalendarDateRangeIcon className="w-4 h-4 absolute right-4 text-slate-500" />
                </div>

                {isPickerOpen && (
                    <div className="bg-surface-2 min-w-[14rem] absolute border border-white/[0.08] shadow-2xl shadow-black/50 bottom-full mb-2 right-0 rounded-2xl z-[1001] overflow-hidden">
                        <div className="select-none h-10 border-b border-white/[0.06] flex items-center justify-between px-4 bg-white/[0.02]">
                            <button
                                onClick={(e) => { e.stopPropagation(); updateDate(selectedMonthData.monthName, selectedMonthData.year - 1); }}
                                className="p-1 hover:bg-white/5 rounded-md transition-colors"
                            >
                                <ArrowLeftIcon className="h-4 w-4 text-slate-400" />
                            </button>
                            <Typography variant="small" className="font-bold text-white">{selectedMonthData.year}</Typography>
                            <button
                                onClick={(e) => { e.stopPropagation(); updateDate(selectedMonthData.monthName, selectedMonthData.year + 1); }}
                                className="p-1 hover:bg-white/5 rounded-md transition-colors"
                            >
                                <ArrowRightIcon className="h-4 w-4 text-slate-400" />
                            </button>
                        </div>
                        <div className="grid grid-cols-3 p-2 gap-1">
                            {monthNames.map((month, idx) => (
                                <button
                                    key={idx}
                                    className={twMerge(
                                        "text-xs py-2.5 rounded-lg flex items-center justify-center font-semibold transition-all duration-200",
                                        selectedMonthData.monthName === month
                                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                                            : "text-slate-400 hover:bg-white/5 hover:text-indigo-400"
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
