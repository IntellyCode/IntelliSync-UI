import React, { useState,useEffect } from "react";
import { Drawer } from "@mui/material";
import Sidebar from "./Sidebar";

import {getSharedVariables, useBreakpoints,breakpoints as eB} from '../ContextProviders';


function D({ open, handleDrawer, resizing}) {

    const SV = getSharedVariables();
    const {breakpoint} = useBreakpoints();
    return (
        <Drawer 
            variant={(eB.smallerOrEqual(breakpoint,"sm"))? "temporary":"persistent"}
            hideBackdrop={true}
            anchor="left"
            open={open}
            sx={{
                width: open? SV.drawerWidth:0,
                flexShrink: 0,
                transition:`width ${!resizing ? 0 : 200}ms`,
                '& .MuiDrawer-paper': {
                    width: SV.drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            transitionDuration={!resizing ? 0 : 200}>
            <Sidebar handleDrawer={handleDrawer}/>
        </Drawer>
    )
}


export default D;