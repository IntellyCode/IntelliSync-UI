import { createContext, useState, useContext } from "react";
import FullBox from "./ReusableComponents/FullBox";
import Header from "./Header";
import Divider from "@mui/material/Divider";

import Month from "./CalendarView/Month/Month";

import MonthClass from "@/DateConstructors/Month.js";

import { getOffsetValues } from "@/ContextProviders";
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
    const { date,setters } = getOffsetValues();
    const monthClass = new MonthClass(date.month,date.year);

    // Set the initial values for mode and view
    const [mode, setMode] = useState("day");
    const [view, setView] = useState("calendar");

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
    return (
        // Wrap the component with the context provider
        <ModeViewContext.Provider value={{ modes, views }}>
            <FullBox direction="column">
                <Header handleDrawer={handleDrawer} />
                <Divider variant="fullWidth" />
                <Month monthClass={monthClass} />
            </FullBox>
        </ModeViewContext.Provider>
    );
}