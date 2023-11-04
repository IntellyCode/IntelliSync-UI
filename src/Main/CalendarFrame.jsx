import { createContext, useState, useContext, useRef, useEffect, lazy, Suspense, useReducer } from "react";
import { useMediaQuery, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getDateValues } from "@ContextProviders";

import {FullBox} from "@ReusableComponents"
import Header from "./Header";
import MonthClass from "@Main/DateConstructors/Month.js";
import YearClass from "@Main/DateConstructors/Year.js";

// Define the initial state
const initialState = {
    mode: "month",
    view: "calendar"
};

// Define the reducer function
function reducer(state, action) {
    switch (action.type) {
        case "SET_MODE":
            return { ...state, mode: action.payload };
        case "SET_VIEW":
            return { ...state, view: action.payload };
        default:
            throw new Error("Invalid action type");
    }
}

// Create a new context for mode and view
const ModeViewContext = createContext();

// Create a custom hook to get the values from the context
export function useModeView() {
    return useContext(ModeViewContext);
}

const Month = lazy(() => import("./CalendarView/Month/Month"));
const Year = lazy(() => import("./CalendarView/Year/Year"));
const YearMobile = lazy(() => import("./CalendarView/Year/YearMobile"));

export default function CalendarFrame({ handleDrawer }) {
    const { date, setters } = getDateValues();
    const theme = useTheme();
    const smallerThanSm = useMediaQuery(theme.breakpoints.down("sm"))

    // Use the useReducer hook to manage state
    const [state, dispatch] = useReducer(reducer, initialState);

    // Check if mode is valid
    if (!["day", "week", "month", "year"].includes(state.mode)) {
        throw new Error("Invalid mode value. Must be day, week, month, or year.");
    }

    // Check if view is valid
    if (!["calendar", "gantt"].includes(state.view)) {
        throw new Error("Invalid view value. Must be calendar or gantt.");
    }

    const modes = {
        mode: state.mode,
        setMode: (mode) => dispatch({ type: "SET_MODE", payload: mode })
    }

    const views = {
        view: state.view,
        setView: (view) => dispatch({ type: "SET_VIEW", payload: view })
    }

    const fallback = (
        <FullBox
            direction="column"
            sx={{
                backgroundColor: theme.palette.primary.main
            }}
        />
    );

    return (
        // Wrap the component with the context provider
        <ModeViewContext.Provider value={{ modes, views }}>
            <FullBox direction="column" >
                <Header handleDrawer={handleDrawer} />
                <Divider variant="fullWidth" />
                <Suspense fallback={fallback}>
                    {state.mode === "month" && <Month monthClass={new MonthClass(date.month, date.year)} />}
                    {state.mode === "year" && !smallerThanSm && <Year yearClass={new YearClass(date.year)} />}
                    {state.mode === "year" && smallerThanSm && <YearMobile year={date.year} />}
                </Suspense>
            </FullBox>
        </ModeViewContext.Provider>
    );
}