import { AppBar, Toolbar, IconButton, Accordion, AccordionSummary, AccordionDetails,Box } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Navigator from "./Navigator";
import CurrentDate from "./CurrentDate";
import SearchBar from "./SearchBar";
import CalendarMode from "./CalendarMode";
import { getSharedVariables } from '../ContextProviders';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { getOffsetValues } from "@/ContextProviders";
import { useModeView } from "../App_right";
export default function Header({ handleDrawer }) {
    const { date, setters } = getOffsetValues();
    const { modes, views } = useModeView();
    const SharedVariables = getSharedVariables();
    const [open, setOpen] = useState(false);
    const appBarStyles = {
        boxShadow: 0,
        width: "100%",
        minHeight:SharedVariables.navBarHeight,
        display: "flex",
        backgroundColor: "primary.main",
        zIndex: 1,
        alignItems: "center",
        justifyContent:"center",
        transition:"height 200ms"

    };
    const toolbarStyles = {
        height: 1,
        width: 0.98,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const iconButtonStyles = {
        display: "flex",
        alignItems: "center",
        mr: 2,

        "&:focus": {
            outline: "none"
        }
    };

    const theme = useTheme();

    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

    

    if (matchesMd) {
        const handleAccordion = () => {
            setOpen(!open);
        };
        return (
            <AppBar position="static" sx={appBarStyles}>
                <Toolbar sx={toolbarStyles} disableGutters>
                    <Accordion variant="noShadow"
                        sx={{ width: 1,m: 0 }}
                        disableGutters expanded={open} >
                        <AccordionSummary variant="centeredContent"
                            expandIcon={<ArrowDropDownIcon fontSize="large" onClick={handleAccordion} />}
                            sx={{ px: 4,height:SharedVariables.navBarHeight, }}
                            
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={iconButtonStyles}
                                onClick={handleDrawer}
                            >
                                <MenuIcon fontSize="medium" />
                            </IconButton>
                            <CurrentDate variant={modes.mode} />
                            {matchesMd && <SearchBar mobile={matchesMd} />}
                        </AccordionSummary>
                        <AccordionDetails variant="even-content"
                            sx={{
                                backgroundColor: "primary.main",
                                width: "100%",
                                m: 0,
                                p:0
                            }}>
                            <CalendarMode variant="condensed" />
                        </AccordionDetails>
                    </Accordion>
                </Toolbar>
            </AppBar>
        )
    }

    return (
        <AppBar position="static" sx={appBarStyles}>
            <Toolbar sx={toolbarStyles}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={iconButtonStyles}
                    onClick={handleDrawer}
                >
                    <MenuIcon fontSize="medium" />
                </IconButton>
                <Navigator />
                <CurrentDate variant={modes.mode} />
                <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"flex-end",
                    width:"100%"
                }}>
                    <SearchBar />
                    <CalendarMode />
                </Box>
            </Toolbar>
        </AppBar>
    )
}