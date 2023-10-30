import { createContext, useState, useContext,useRef, useEffect } from "react";
import FullBox from "./ReusableComponents/FullBox";
import Header from "./Header";
import Divider from "@mui/material/Divider";

import Month from "./CalendarView/Month/Month";

import MonthClass from "@/DateConstructors/Month.js";
import YearClass from "@/DateConstructors/Year.js";
import { getDateValues } from "@/ContextProviders";
import Year from "./CalendarView/Year/Year";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import YearMobile from "./CalendarView/Year/YearMobile";
// Create a new context for mode and view
const ModeViewContext = createContext();

// Create a custom hook to get the values from the context
export function useModeView() {
    const context = useContext(ModeViewContext);
    if (context === undefined) {
        throw new Error("useModeView must be used within a ModeViewProvider");
    }
    return context;
}
export default function AppRight({ handleDrawer }) {
    const { date,setters } = getDateValues();
    // Set the initial values for mode and view
    const [mode, setMode] = useState("year");
    const [view, setView] = useState("calendar");
    const theme = useTheme();
    const smallerThanSm = useMediaQuery(theme.breakpoints.down("sm"))
    
    // Check if mode is valid
    if (!["day", "week", "month", "year"].includes(mode)) {
        throw new Error("Invalid mode value. Must be day, week, month, or year.");
    }

    // Check if view is valid
    if (!["calendar", "gantt"].includes(view)) {
        throw new Error("Invalid view value. Must be calendar or gantt.");
    }

    const modes = {
        mode,
        setMode
    }

    const views = {
        view,
        setView
    }
    /*useEffect(() => {
        if (mode == "year" && smallerThanMd) {
            setMode("month")
        }
    },[mode,smallerThanMd])
    */
    return (
        // Wrap the component with the context provider
        <ModeViewContext.Provider value={{ modes, views }}>
            <FullBox direction="column" >
                <Header handleDrawer={handleDrawer} />
                <Divider variant="fullWidth" />
                {mode=="month"&&<Month monthClass={new MonthClass(date.month,date.year)} />}
                {mode=="year" &&!smallerThanSm&&<Year yearClass={new YearClass(date.year)} />}
                {mode=="year" &&smallerThanSm&&<YearMobile year={date.year}/>}
            </FullBox>
        </ModeViewContext.Provider>
    );
}