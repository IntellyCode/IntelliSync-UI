import { useState, useEffect, useCallback, useMemo, useReducer, lazy, Suspense } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import CalendarFrame from "./CalendarFrame";
import {FullBox} from "@ReusableComponents"
import Month from "@Main/DateConstructors/Month";
import Drawer from "@Main/Drawer";

const initialState = {
    drawerOpen: false,
    drawerClicked: true
};

function reducer(state, action) {
    switch (action.type) {
        case "OPEN_DRAWER":
            return {
                drawerClicked: false,
                drawerOpen: true
            };
        case "CLOSE_DRAWER":
            return {
                drawerClicked: false,
                drawerOpen: false
            };
        case "TOGGLE_DRAWER":
            return {
                drawerOpen: !state.drawerOpen,
                drawerClicked: true,
            };
        default:
            throw new Error();
    }
}

export default function MainFrame() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const theme = useTheme();
    const matchesLg = useMediaQuery(theme.breakpoints.down("lg"));

    const { drawerOpen, drawerClicked } = state;
    useEffect(() => {
        if (matchesLg) {
            dispatch({ type: "CLOSE_DRAWER" });
        } else {
            dispatch({ type: "OPEN_DRAWER" });
        }
    }, [matchesLg]);

    const handleDrawer = useCallback(() => {
        dispatch({ type: "TOGGLE_DRAWER" });
    }, []);
    return (
        <FullBox direction="row">
            <Drawer open={drawerOpen} handleDrawer={handleDrawer} drawerClicked={drawerClicked} />
            <CalendarFrame handleDrawer={handleDrawer} />
        </FullBox>
    );
}