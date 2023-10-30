import React from 'react';
import { IconButton, Box, Divider } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import {getSharedVariables} from '@ContextProviders';



const iconButtonStyle = {
    '&:focus': {
        outline: 'none',
    },
};

export default function Footer() {
    const { footerHeight } = getSharedVariables();
    const footerStyle = {
width:1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        px: 1,
        height: footerHeight

    };
    return (
        <Box sx={{ ...footerStyle }}>
            <IconButton sx={iconButtonStyle}>
                <SettingsIcon />
            </IconButton>
            <IconButton sx={iconButtonStyle}>
                <HelpOutlineIcon />
            </IconButton>

        </Box>

    );
}
