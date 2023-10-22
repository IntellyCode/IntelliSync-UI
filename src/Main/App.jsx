import React, { useState, useEffect} from "react";
import Sidebar from "./Sidebar/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, Box } from "@mui/material";
import Drawer from "./Sidebar";
import theme from "../theme";
import AppRight from "./App_right";
import { getSharedVariables, isResizing, ResizeEnum as RE } from './ContextProviders';

import FullBox from "./ReusableComponents/FullBox";

import Month from "@/DateConstructors/Month";

export default function App() {

    const sharedVariables = getSharedVariables();
    const { resizing } = isResizing();
    const [drawer, setDrawer] = useState(true);
    const [drawerClicked, setDrawerClicked] = useState(true);
    const handleDrawer = () => {
        setDrawerClicked(true);
        setDrawer(!drawer);

    };
    useEffect(() => {

        if (drawer == true) {
            if (resizing == RE.increasing) {
                setDrawer(true);
                setDrawerClicked(false);
            } else if (resizing == RE.decreasing) {
                setDrawer(false);
            }
        }
        if (resizing == RE.notResizing) {
            setDrawerClicked(false);
        }

    }, [resizing]);
    return (
        <ThemeProvider theme={theme}>
            <FullBox direction="row">
                <Drawer
                    open={drawer}
                    handleDrawer={handleDrawer}
                    resizing={drawerClicked} />
                    <AppRight handleDrawer={handleDrawer} />
            </FullBox>
        </ThemeProvider>
    );
}
