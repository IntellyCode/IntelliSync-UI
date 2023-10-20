import React, { useState, useEffect, createContext, useContext } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, Container, Button, Divider, Box } from "@mui/material";
import Drawer from "./Sidebar/Drawer";
import theme from "./theme";
import Header from "./Header/Header";

import { getSharedVariables, isResizing, ResizeEnum as RE } from './ContextProviders';

const sharedBoxStyles = { width: 1, height: 1, display: "flex", p: 0, m: 0, alignItems: "center", justifyContent: "flex-start" };

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
        if(resizing==RE.notResizing){
            setDrawerClicked(false);
        }

    }, [resizing]);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ ...sharedBoxStyles, flexDirection: "row" }}>
                <Drawer open={drawer} handleDrawer={handleDrawer} resizing={drawerClicked} />
                <Box sx={{ ...sharedBoxStyles, flexDirection: "column" }}>
                    <Header handleDrawer={handleDrawer} />
                    <Divider sx={{ width: 1 }} />
                </Box>

            </Box>
        </ThemeProvider>
    );
}
