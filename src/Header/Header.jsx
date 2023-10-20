import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import AccountDetails from "./AccountDetails";
import MenuIcon from '@mui/icons-material/Menu';
import Navigator from "./Navigator";
import CurrentDate from "./CurrentDate";
import SearchBar from "./SearchBar";
import Menu from "./CalendarMode"
import CalendarMode from "./CalendarMode";

import {getSharedVariables} from '../ContextProviders';

export default function Header({ handleDrawer }) {

    const { sidebarHideSize, sidebarMinSize, navBarHeight} = getSharedVariables();

    return (
        <AppBar position="static" sx={{ boxShadow: 0, width: "100%", height: navBarHeight, display: "flex", backgroundColor: "primary.main",minWidth:"680px" }}>
            <Toolbar sx={{ height: 1,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        mr: 2,
                        "&:focus": {
                            outline: "none"
                        }
                    }}
                    onClick={handleDrawer}
                >
                    <MenuIcon fontSize="medium" />
                </IconButton>
                <Navigator />
                <CurrentDate day={1} month={"November"} year={2023}/>
                <SearchBar/>
                <CalendarMode/>

            </Toolbar>
        </AppBar>
    )

}