import { AppBar, Toolbar, IconButton, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
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

import { getDateValues } from "@/ContextProviders";
import { useModeView } from "../App_right";
import FullBox from "../ReusableComponents/FullBox";
export default function Header({ handleDrawer }) {
    const { date, setters } = getDateValues();
    const { modes, views } = useModeView();
    const SharedVariables = getSharedVariables();
    const [open, setOpen] = useState(false);

    const theme = useTheme();

    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

    const appBarStyles = {
        boxShadow: 0,
        width: "100%",
        minHeight: SharedVariables.navBarHeight,
        display: "flex",
        backgroundColor: "primary.main",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        transition: "height 200ms"

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
        mx: matchesSm ? 0 : 2,
        p: matchesSm ? 0 : 2,
        "&:focus": {
            outline: "none"
        }
    };

    const accordionSummary = {
        px: matchesSm ? 1 : 4,
        height: SharedVariables.navBarHeight,
        width: 1,
    }
    if (matchesMd) {
        const handleAccordion = () => {
            setOpen(!open);
        };
        return (
            <AppBar position="static" sx={appBarStyles}>
                <Toolbar sx={toolbarStyles} disableGutters>
                    <Accordion variant="noShadow"
                        sx={{ width: 1, m: 0 }}
                        disableGutters expanded={open} >
                        <AccordionSummary variant="centeredContent"

                            sx={accordionSummary}

                        >
                            <FullBox direction="row"
                                sx={{
                                    justifyContent: "space-between",
                                    boxSizing: "border-box",
                                    px: !matchesSm ? 3 : 1
                                }}>
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
                                <FullBox direction="row"
                                    sx={{
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    onClick={handleAccordion} >
                                    <CurrentDate variant={modes.mode} />
                                    <ArrowDropDownIcon fontSize={matchesSm ? "medium" : "large"} sx={{
                                        transform: open ? "rotate(-180deg)" : "rotate(0deg)",
                                        transition: "transform 200ms"
                                    
                                    }} />
                                </FullBox>
                                <SearchBar mobile={matchesMd} />
                            </FullBox>
                        </AccordionSummary>
                        <AccordionDetails variant="even-content"
                            sx={{
                                backgroundColor: "primary.main",
                                width: "100%",
                                m: 0,
                                p: 0
                            }}>
                            <CalendarMode variant="condensed" mobile={matchesSm} />
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "100%"
                }}>
                    <SearchBar />
                    <CalendarMode />
                </Box>
            </Toolbar>
        </AppBar>
    )
}