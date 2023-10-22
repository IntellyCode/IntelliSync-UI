import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { getOffsetValues } from '@ContextProviders';

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

function CurrentDate({ variant = "month" }) {
    if (!["day", "week", "month", "year"].includes(variant)) {
        throw new Error("Invalid variant prop value. Must be day, week, month, or year.");
    }

    const { date, setters } = getOffsetValues();
    const typographyStyle = { mx: 1,userSelect:"none",fontSize:"22px" };
    return (
        <Box sx={{ display: "flex", alignItems: "center",width:"200px",justifyContent:"center" }}>
            {variant=="day" && (
                <Typography variant="h6" sx={typographyStyle}>
                    {date.day}
                </Typography>
            )}
            {variant!="year" && (
                <Typography variant="h6" sx={typographyStyle}>
                    {monthNames[date.month]},
                </Typography>
            )}
            
            <Typography variant="h6" sx={{...typographyStyle,fontWeight:"bold"}}>
                {date.year}
            </Typography>
        </Box>
    );
}
export default CurrentDate;
