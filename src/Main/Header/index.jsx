import { AppBar, Toolbar, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
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

export default function Header({ handleDrawer }) {
    const SharedVariables = getSharedVariables();
    const appBarStyles = {
        boxShadow: 0,
        width: "100%",
        height: SharedVariables.navBarHeight,
        display: "flex",
        backgroundColor: "primary.main",
        zIndex:1,
    };
    const toolbarStyles = {
        height: 1,
        width: 1,
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

    const [open, setOpen] = useState(false);

    if (matchesMd) {
        const handleAccordion= () => {
            setOpen(!open);
          };
        return (
            <AppBar position="static" sx={appBarStyles}>
                <Toolbar sx={toolbarStyles} disableGutters>
                    <Accordion variant="noShadow" 
                    sx={{ width: 1,zIndex:2,position:"relative",m:0}} 
                    disableGutters expanded={open} >
                        <AccordionSummary variant="centeredContent" 
                        expandIcon={<ArrowDropDownIcon fontSize="large" onClick={handleAccordion}/>}
                        sx={{px:4}}
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
                            <CurrentDate day={1} month={"November"} year={2023} />
                            {!matchesSm && <CalendarMode variant="condensed" />}
                            {matchesSm&&<div></div>}
                        </AccordionSummary>
                        <AccordionDetails variant="even-content" 
                        sx={{
                        backgroundColor:"primary.main",
                        position:"absolute",
                        width:"100%",
                        m:0,
                        opacity: open ? 1:0, 
                        px:!matchesSm? 12:1,
                        justifyContent:matchesSm?"center":"space-between",
                        transition:"opacity 600ms"}}>
                            <Navigator />
                            <SearchBar mobile={matchesSm} />
                            {matchesSm && <CalendarMode variant="condensed" />}
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
                <CurrentDate day={1} month={"November"} year={2023} />
                <SearchBar />
                <CalendarMode />
            </Toolbar>
        </AppBar>
    )
}