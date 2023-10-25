import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, Box, useMediaQuery } from "@mui/material";
import Drawer from "./Sidebar";
import theme from "../theme";
import AppRight from "./App_right";

import FullBox from "./ReusableComponents/FullBox";

import Month from "@/DateConstructors/Month";
import { useTheme } from "@emotion/react";

export default function App() {
    //console.clear();
    const [drawer, setDrawer] = useState(true);
    const [drawerClicked, setDrawerClicked] = useState(true);
    const handleDrawer = () => {
        setDrawerClicked(true);
        setDrawer(!drawer);
    };
    const matchesLg = useMediaQuery(theme.breakpoints.down("lg"));

    useEffect(() => {
        if (matchesLg) {
            setDrawerClicked(false);
            setDrawer(false);
        } else{
            setDrawerClicked(false);
        }
    }, [matchesLg])
    /**
    //This useEffect is used to close the drawer automatically, when resizing the window
    //It is inefficient in a completely browser environment 
    //Hence disabled on the web, but will be enabled and rewritten for tauri
     //setDrawerClicked(true);
     const [drawerClicked, setDrawerClicked] = useState(true);
      const { resizingX } = isResizing();
    useEffect(() => {
        if (drawer == true) {
            if (resizingX == RE.increasing) {
                setDrawer(true);
                setDrawerClicked(false);
            } else if (resizingX == RE.decreasing) {
                setDrawer(false);
            }
        }
        if (resizingX == RE.notResizing) {
            setDrawerClicked(false);
        }

    }, [resizingX]);
    */
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
