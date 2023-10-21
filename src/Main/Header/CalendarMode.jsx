import { Menu, Box, Grid, Button, MenuItem, Divider, ToggleButton, ToggleButtonGroup, Typography, Checkbox, ButtonBase } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState } from "react";
import SquareIcon from '@mui/icons-material/Square';
import CheckIcon from '@mui/icons-material/Check';



const menuItemStyle = { px: 4, m: 0, cursor: "pointer" };
const typographyStyle = {fontSize:"16px"}
export default function CalendarMode( {variant }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mode, setMode] = React.useState("Month");
    const [view, setView] = React.useState("Calendar");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (mode) => {
        if (mode != "inherit") setMode(mode);
        setAnchorEl(null);
    };

    const handleView = (event, newView) => {
        if (newView != null) setView(newView);
    };
    return (
        <Box sx={{ justifySelf: "flex-end", ml: variant=="condensed" ? 0:"auto", mr: variant=="condensed" ? 0:"6",display:"flex",alignItems:"center",my:2 }}>
            <Button
                variant="contained"
                color="primary"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    width: 100,
                    borderRadius: "5px",
                    boxShadow: "none",
                    border: "1px solid #E9E9E9",
                    "&:hover": {
                        border: "1px solid #E9E9E9",
                        boxShadow: "none",
                    }
                }}
            >{mode}<KeyboardArrowDownIcon /></Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose("inherit")}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    mt: 2,
                    '& .MuiPaper-root': {
                        minWidth: 180
                    }
                }}>
                <MenuItem onClick={() => { handleClose("Day") }} sx={menuItemStyle}><Typography sx={typographyStyle}>Day</Typography></MenuItem>
                <MenuItem onClick={() => { handleClose("Week") }} sx={menuItemStyle}><Typography sx={typographyStyle}>Week</Typography></MenuItem>
                <MenuItem onClick={() => { handleClose("Month") }} sx={menuItemStyle}><Typography sx={typographyStyle}>Month</Typography></MenuItem>
                <MenuItem onClick={() => { handleClose("Year") }} sx={menuItemStyle}><Typography sx={typographyStyle}>Year</Typography></MenuItem>
                <Divider />
                <OptionsGroup />
            </Menu>
        </Box>
    )

}

function OptionsGroup() {
    const [checked, setChecked] = useState(1);
    return (
        <Box>
            <Option checked={checked == 1} onToggle={() => setChecked(1)}>
                <Typography sx={typographyStyle} >Calendar</Typography>
            </Option>
            <Option checked={checked == 2} onToggle={() => setChecked(2)}>
                <Typography sx={typographyStyle}>Gantt</Typography>
            </Option>
        </Box>
    )

}

function Option({ checked, onToggle, children }) {

    const commonStyle = {
        color: checked ? "success.main" : "checkbox.gray",
        backgroundColor: checked ? "success.main" : "checkbox.gray",
        fontSize: "large",
        borderRadius: "4px",
        boxShadow: `inset 0 0 3px rgba(56,45,56,0.86)`,
        border: "rgb(0,0,0,0.2) solid 1px",
    };
    const gridItemStyle = { display: "flex", alignItems: "center" };
    const grid = {
        "&:hover": {
            backgroundColor: "secondary.main"
        }
    }
    return (
        <ButtonBase
            sx={{
                display: "block",
                width:1,
                borderRadius:0,
                "&:focus":{
                    outline:"none"
                }
            }}>
            <Grid container sx={{ ...menuItemStyle, ...grid }} onClick={onToggle}>
                <Grid item xs={3} sx={gridItemStyle}>
                    <Checkbox
                        icon={<CheckIcon sx={{ color: "transparent" }} />}
                        checkedIcon={<CheckIcon sx={{ color: "black" }} />}
                        checked={checked}
                        disableFocusRipple
                        disableRipple
                    /></Grid>
                <Grid item xs={8} sx={{ ...gridItemStyle, justifyContent: "center" }}>{children}</Grid>
            </Grid>
        </ButtonBase>
    )

}