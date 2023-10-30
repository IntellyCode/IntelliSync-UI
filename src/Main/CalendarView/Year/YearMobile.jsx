/**
 * @module YearMobile
 * @desc Year view for mobile devices
 * 
 * This component is an independent component that is used by the CalendarView component.
 * It is used to display the year view for mobile devices.
 * It has a grid of 3 columns and 4 rows.
 * Each cell in the grid shows the month and a list of important events in a month
 * Each cell is clickable allowing for zooming into the month view
 */

import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@emotion/react';
import FullBox from '@ReusableComponents/FullBox';
import { getDateValues } from '@ContextProviders/DateTrackerProvider';
import { useModeView } from '../../CalendarFrame';
import { isResizing } from '@ContextProviders';

const monthsArray = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function YearMobile({ year }) {
    const theme = useTheme();
    const containerInfo = isResizing();
    // Replace this with a function to get events for each month
    function getEvents(month) {
        // Sample events for demonstration
        return [
            { date: new Date(year, month, 1), title: "Event 1", color: theme.palette.quaternary.main },
            { date: new Date(year, month, 2), title: "Event 2", color: theme.palette.secondary.dark},
            { date: new Date(year, month, 3), title: "Event 3", color: "lightblue" },
            { date: new Date(year, month, 4), title: "Event 4", color: "green" },
        ];
    }

    const typographyStyle = {
        width: 1,
        p: 1,
        borderRadius: 1,
        color: 'red',
        textAlign: "center",
    }
    const listItemStyle = {
        p: 0.2,
        m: 0,
        textAlign: "center",
        borderRadius: 1.5,
        color: theme.palette.primary.main,
    }

    const gridStyle = {
        height: 0.25,
        m: 0,
        p: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    }

    const fullBoxStyle = {
        p: 1,
        borderRadius:1,
        "&:hover": {
            backgroundColor:"rgb(0,0,0,0.1)"
        },
        "&:active": {
            backgroundColor:"rgb(0,0,0,0.15)",
            scale:"0.99"
        },
        width:0.8
    }
    const { date, setters } = getDateValues();
    const { modes, views } = useModeView();
    function getToMonth(month) {
        //get month position in array based on month name
        const monthIndex = monthsArray.indexOf(month);
        setters.setMonth(monthIndex);
        modes.setMode("month");
    }
    return (

        <Grid container sx={{
            height: 1,
            width: 1,
            gap: 0,
            overflow: "scroll",
            p: 1,
        }}
            rowSpacing={0}>
            {monthsArray.map((month, index) => (
                <Grid item xs={4} key={index}
                    sx={gridStyle}
                    onClick={() => getToMonth(month)}>
                    <FullBox sx={{ ...fullBoxStyle }} direction="column">
                        <Typography variant="body2" align="center" sx={typographyStyle}>{month}</Typography>
                        <FullBox sx={{ p: 1, overflow: "scroll" }} direction="column">
                            <List disablePadding dense sx={{ width: 0.9 }}>
                                {getEvents(index).map((event, index) => (
                                    <ListItem key={index} sx={{ ...listItemStyle, my: 1 }} alignItems='center'>
                                        <ListItemText primary={event.title}
                                            sx={{
                                                ...listItemStyle,
                                                backgroundColor: event.color
                                            }} />
                                    </ListItem>
                                ))}
                            </List>
                        </FullBox>
                    </FullBox>
                </Grid>
            ))
            }
        </Grid >
    );
}
