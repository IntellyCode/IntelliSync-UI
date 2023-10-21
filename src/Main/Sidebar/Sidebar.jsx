import React, { useRef, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import AccountDetails from './AccountDetails';
import Calendars from './Calendars';
import Filters from './Filters';
import Reminders from './Reminders';
import Footer from './Footer';


import {getSharedVariables,useBreakpoints,breakpoints as eB} from '../ContextProviders';


export default function Sidebar({ handleDrawer}) {
    const SharedVariables = getSharedVariables();
    const {breakpoint} = useBreakpoints();

    return (
        <Box
            sx={{
                height: "100%",
                width:eB.equal(breakpoint,"xsm")? 1 : (eB.equal(breakpoint,"sm")? SharedVariables.sidebarMinSize:eB.larger(breakpoint,"sm") ? SharedVariables.drawerWidth:0) ,
                backgroundColor: 'secondary.main',
                position: 'relative',
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"flex-start"
                
            }}
        >
            <AccountDetails mobile={eB.smallerOrEqual(breakpoint,"sm")} handleDrawer={handleDrawer} />
            <Divider sx={{width:1}}/>
            <Box
                sx={{ flex:1,width: 1, overflow: 'scroll',p:0,m:0}}
                
            >
                <Calendars />
                <Reminders />
                <Filters />
            </Box>
            <Divider sx={{width:1}}/>
            <Footer />

        </Box>
    );
}
