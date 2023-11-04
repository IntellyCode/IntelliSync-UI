import React, { forwardRef, useState } from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Grid, Checkbox, Button, Divider, FormControlLabel } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SquareIcon from "@mui/icons-material/Square";
import CheckIcon from "@mui/icons-material/Check";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const typographyStyle = { textAlign: "left", width: 'fit-content', p: 2, color: "primary.contrastText", fontSize: "17px" };
const frame = { height: 'auto', py: 4, px: 2 };
const summary = { display: "flex", alignItems: "center", justifyContent: "space-between" };

const remindersData = [
    { name: "Meeting with Client", id: 1 },
    { name: "Monthly Report ", id: 2 },
    { name: "Buy Groceries", id: 3 },
];

const Reminders = () => {
    const [completedFilter, setCompletedFilter] = useState("all");
    const [checkedReminders, setCheckedReminders] = useState([3, 1]);

    const handleFilterChange = (filter) => {
        setCompletedFilter(filter);
    };

    const handleReminderToggle = (id) => {
        const updatedCheckedReminders = [...checkedReminders];

        if (updatedCheckedReminders.includes(id)) {
            updatedCheckedReminders.splice(updatedCheckedReminders.indexOf(id), 1);
        } else {
            updatedCheckedReminders.push(id);
        }

        setCheckedReminders(updatedCheckedReminders);
    };

    const filteredReminders =
        completedFilter === "completed"
            ? remindersData.filter((reminder) => checkedReminders.includes(reminder.id))
            : completedFilter === "incompleted"
                ? remindersData.filter((reminder) => !checkedReminders.includes(reminder.id))
                : remindersData;

    return (
        <Container sx={frame} >
            <Accordion disableGutters >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ ...summary, p: 0 }}>
                    <Typography variant="body1" sx={typographyStyle}>
                        Today's Reminders
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={0.5} direction="row" sx={{ mb: 3 }} justifyContent={"space-between"}>
                        <Button
                            variant="contained"
                            onClick={() => handleFilterChange("all")}
                            sx={{color:"primary.contrastText",backgroundColor:completedFilter === "all" ? "quaternary.main" : "quaternary.light"}}
                        >
                            All
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleFilterChange("completed")}
                            sx={{color:"primary.contrastText",backgroundColor:completedFilter === "completed" ? "success.main" : "success.light"}}
                        >
                            <DoneIcon/>
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleFilterChange("incompleted")}
                            sx={{color:"primary.contrastText",backgroundColor:completedFilter === "incompleted" ? "missing.main" : "missing.light"}}
                        >
                            <CloseIcon/>
                        </Button>
                    </Stack>
                    <Divider />
                    <Stack sx={{ maxHeight: 300, overflow: "scroll" }} spacing={0.5}>
                        {filteredReminders.map((reminder) => (
                            <ReminderEntry
                                key={reminder.id}
                                name={reminder.name}
                                id={reminder.id}
                                checked={checkedReminders.includes(reminder.id)}
                                onToggle={handleReminderToggle}
                            />
                        ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

function ReminderEntry({ name, id, checked, onToggle }) {
    const commonStyle = {
        color: checked ? "success.main" : "checkbox.gray",
        backgroundColor: checked ? "success.main" : "checkbox.gray",
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

    );
}

export default Reminders;