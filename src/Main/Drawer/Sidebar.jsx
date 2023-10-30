import React, { useRef, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import AccountDetails from './AccountDetails';
import Calendars from './Calendars';
import Filters from './Filters';
import Reminders from './Reminders';
import Footer from './Footer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { getSharedVariables} from '@ContextProviders';


export default function Sidebar({ handleDrawer }) {
    const SharedVariables = getSharedVariables();
    const theme = useTheme();

    const matches ={
        xs: useMediaQuery(theme.breakpoints.down('xs')),
        sm: useMediaQuery(theme.breakpoints.down('sm')),
        lg: useMediaQuery(theme.breakpoints.down('lg')),
        upmd: useMediaQuery(theme.breakpoints.up('md')),
    } 

    const boxStyle = {
        height: "100%",
        backgroundColor: 'secondary.main',
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    }
    return (
        <Box
            sx={{
                width: (matches.xs? 1 : 
                    matches.sm ? SharedVariables.sidebarMinSize : 
                    SharedVariables.drawerWidth ),
                ...boxStyle
            }}>

            
            <AccountDetails mobile={matches.lg} handleDrawer={handleDrawer} />
            <Divider variant='fullWidth' />
            <Box sx={{ flex: 1, width: 1, overflow: 'scroll', p: 0, m: 0 }}>
                <Calendars />
                <Reminders />
                <Filters />
            </Box>
            <Divider variant='fullWidth' />
            <Footer />

        </Box>
    );
}
