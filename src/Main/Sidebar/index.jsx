import React, { useState,useEffect } from "react";
import { Drawer } from "@mui/material";
import Sidebar from "./Sidebar";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import {getSharedVariables} from '../ContextProviders';


function SiderbarOverlay({ open, handleDrawer, resizing}) {
    const SV = getSharedVariables();

    const theme = useTheme();

    const matches = useMediaQuery(theme.breakpoints.down('lg'));
    
    const drawerStyle ={
        width: open? SV.drawerWidth:0,
        flexShrink: 0,
        transition:`width ${!resizing ? 0 : 200}ms`,
        '& .MuiDrawer-paper': {
            width: SV.drawerWidth,
            boxSizing: 'border-box',
            position:"fixed",

        },
    };


    return (
        <Drawer 
            variant={matches? "temporary":"persistent"}
            hideBackdrop={true}
            anchor="left"
            open={open}
            sx={drawerStyle}
            transitionDuration={!resizing ? 0 : 200}>
            <Sidebar handleDrawer={handleDrawer}/>
        </Drawer>
    )
}


export default SiderbarOverlay;