import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CalendarDateRangeIcon } from '@heroicons/react/24/solid';
import { Typography } from "@material-tailwind/react";

function DatePicker({ date, handleInputChange, field, index, title, isDisable }) {
    const [selectedMonthData, setSelectedMonthData] = useState(isDisable ? {
        year: 2024,
        monthName: "Jan",
    } : {
        year: Number(date?.split('-')[1]),
        monthName: date?.split('-')[0],
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


    useEffect(() => {
        const newDate = selectedMonthData.monthName + '-' + selectedMonthData.year
        handleInputChange(field, index)({ target: { value: newDate } })
    }, [selectedMonthData])

    return (

        <div ref={inputRef} className=" relative flex items-center flex-col">

            <div className="w-[9rem]">
                <Typography className=" text-[#a2a2a2] text-sm font-normal">
                    {title}
                </Typography>
            </div>

            <div className=" relative flex items-center">
              
                <div onClick={() => setIsPickerOpen(isDisable ? false : true)} className={` cursor-text ${isPickerOpen && 'border-2'} ${isDisable && 'opacity-50'} transition-transform duration-500 border w-[9rem] h-9 flex items-center rounded-md text-[#475c66] border-[#b0bec5] pl-2 pr-6 `}>
                    {isDisable ? "present" : date}
                </div>
                <CalendarDateRangeIcon className=" w-4 h-4 absolute right-2 text-[#475c66]" />
            </div>
            {isPickerOpen ? (
                <div className=" bg-white w-[12.5rem] h-[14rem] absolute border shadow-md top-[-14rem] rounded-md z-50 ">
                    <div className=" select-none h-9 border flex items-center justify-center gap-5">
                        <ArrowLeftIcon className=" h-4 w-4 cursor-pointer" onClick={() => setSelectedMonthData(prev => ({
                            ...prev,
                            year: prev.year - 1
                        }))} />
                        <Typography className=" text-sm font-semibold ">{selectedMonthData.year}</Typography>
                        <ArrowRightIcon className=" h-4 w-4" onClick={() => setSelectedMonthData(prev => ({
                            ...prev,
                            year: prev.year + 1
                        }))} />
                    </div>
                    <div className=" grid grid-cols-3 p-2 place-content-start w-full h-full place-items-center ">
                        {monthNames.map((month, index) => ( // Loop through month names
                            <div key={index} className="text-sm w-full hover:bg-green-50 py-3 rounded-lg flex items-center justify-center font-medium cursor-pointer" onClick={() => {
                                setSelectedMonthData(prev => ({
                                    ...prev,
                                    monthName: month  // Set month based on index
                                }));
                                setIsPickerOpen(false); // Close the picker after selection
                            }}>
                                {month}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>

    );
}

export default DatePicker

