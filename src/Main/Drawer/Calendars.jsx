// Import necessary components and icons from Material-UI.
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Grid, Checkbox,FormControlLabel,Divider } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SquareIcon from '@mui/icons-material/Square';
import CheckIcon from '@mui/icons-material/Check';
import React, { forwardRef, useEffect, useState } from "react";

// Define a shared typography style.
const typographyStyle = { textAlign: "left", width: 'fit-content', p: 2,color:"primary.contrastText",fontSize:"17px" };

// Define common styles for components.
const frame = { height: 'auto', py: 4, px: 2};

const Calendars = () =>{
    const calendarData = [
        { name: "Google Calendar", color: "red", id: 1 },
        { name: "Apple Calendar", color: "blue", id: 2 },
        { name: "Home", color: "gray", id: 3 },
    ];

    const [checkedCalendars, setCheckedCalendars] = useState([3, 2, 1]);

    const handleCalendarToggle = (id) => {
        if (checkedCalendars.includes(id)) {
            setCheckedCalendars(checkedCalendars.filter((calendarId) => calendarId !== id));
        } else {
            setCheckedCalendars([...checkedCalendars, id]);
        }
    };


    return (
        <Container sx={frame}>
            <Accordion disableGutters  >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 0 }} variant="centeredContent">
                    <Typography variant="body1" sx={typographyStyle}>Calendars</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={0.5} sx={{overflow:"scroll",maxHeight:300}}>
                        {calendarData.map((calendar) => (
                            <CalendarEntry
                                key={calendar.id}
                                name={calendar.name}
                                color={calendar.color}
                                id={calendar.id}
                                checked={checkedCalendars.includes(calendar.id)}
                                onToggle={handleCalendarToggle}
                            />
                        ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}

function CalendarEntry({ name, color, id, checked, onToggle }) {
    // Define common style properties for Checkbox components.
    const commonStyle = {
        color: `checkbox.${color}`,
        backgroundColor: `checkbox.${color}`,
        fontSize: "large",
        borderRadius: "4px",
        boxShadow: `inset 0 0 3px rgba(56,45,56,0.86)`,
        border: "rgb(0,0,0,0.2) solid 1px",
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    icon={<SquareIcon sx={{ ...commonStyle }} />}
                    checkedIcon={<CheckIcon sx={{ ...commonStyle, color: "white" }} />}
                    checked={checked}
                    onChange={() => onToggle(id)}
                />
            }
            label={name}
        />
    )
}

export default Calendars;