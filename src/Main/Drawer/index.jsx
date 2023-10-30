import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { Drawer as MuiDrawer } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { getSharedVariables } from '@ContextProviders';

import FullBox from "@ReusableComponents/FullBox";

const Sidebar = lazy(() => import("./Sidebar"));

function Drawer({ open, handleDrawer, drawerClicked }) {
    const SV = getSharedVariables();

    const theme = useTheme();

    const matches = useMediaQuery(theme.breakpoints.down('lg'));

    const drawerStyle = {
        width: open ? SV.drawerWidth : 0,
        flexShrink: 0,
        transition: `width ${drawerClicked ? 200 : 0}ms`,
        '& .MuiDrawer-paper': {
            width: SV.drawerWidth,
            boxSizing: 'border-box',
            position: "fixed",

        },
    };

    const fallback = useMemo(() => (

        <FullBox direction="row"
            sx={{
                width: SV.drawerWidth,
                backgroundColor: theme.palette.secondary.main
            }}>

        </FullBox>
    ), [])


    return (
        <MuiDrawer
            variant={matches ? "temporary" : "persistent"}
            hideBackdrop={true}
            anchor="left"
            open={open}
            sx={drawerStyle}
            transitionDuration={drawerClicked ? 200 : 0}>
            <Suspense fallback={fallback}>
                {open && <Sidebar handleDrawer={handleDrawer} />}
            </Suspense>
        </MuiDrawer>
    )
}

export default Drawer;