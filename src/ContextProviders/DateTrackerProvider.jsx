/**
 * This is a context provider that tracks the date the calendar is showing
 * Not the current date 
 * It tracks the month offset a number between -11 to + 11 
 * It also tracks the day offset a number from -31 to 31
 * And it also tracks the year offset
 * This context is also responsible to update the month offset if the day offset is out of range
 * This context is also responsible to update the year offset if the month offset is out of range
 */

import React, { createContext, useEffect, useState,useContext } from 'react';

const DateTrackerContext = createContext();

export function getDateValues() {
    return useContext(DateTrackerContext);
}

const DateTracker = ({ children }) => {
    const [monthOffset, setMonthOffset] = useState(0);
    const [dayOffset, setDayOffset] = useState(0);
    const [yearOffset, setYearOffset] = useState(0);
    const actualDate = new Date();
    const calendarDate = new Date(actualDate.getFullYear() + yearOffset, actualDate.getMonth() + monthOffset, actualDate.getDate() + dayOffset);
    const date = {
        day: calendarDate.getDate(),
        month:calendarDate.getMonth(),
        year: calendarDate.getFullYear(),
    }
    useEffect(() => {
        if(dayOffset < -31){
            setMonthOffset(monthOffset - 1);
            setDayOffset(dayOffset + 31);
        } else if (dayOffset > 31){
            setMonthOffset(monthOffset + 1);
            setDayOffset(dayOffset - 31);
        }
        
    },[dayOffset])

    useEffect(() => {
        if(monthOffset < -11){
            setYearOffset(yearOffset - 1);
            setMonthOffset(monthOffset + 11);
        } else if (monthOffset > 11){
            setYearOffset(yearOffset + 1);
            setMonthOffset(monthOffset - 11);
        }
    },[monthOffset])
    
    function setDay(day){
        setDayOffset(day - actualDate.getDate());
    }
    function setMonth(month){
        setMonthOffset(month - actualDate.getMonth());
    }
    function setYear(year){
        setYearOffset(year - actualDate.getFullYear());
    }
    
    const setters={
        setDayOffset,
        setMonthOffset,
        setYearOffset,
        setDay,
        setMonth,
        setYear
    }

    return (
        <DateTrackerContext.Provider value={{date,setters}}>
            {children}
        </DateTrackerContext.Provider>
    );
}

export default DateTracker;