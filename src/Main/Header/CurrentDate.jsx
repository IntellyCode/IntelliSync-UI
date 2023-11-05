import React, {memo} from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { getDateValues } from '@ContextProviders';
import { useTheme } from '@mui/material/styles';   
import { smallerThan } from '@Utils';
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

const CurrentDate = memo(({ variant = "month" }) =>{
    const theme = useTheme();

    const matchesSm = smallerThan("sm");

    if (!["day", "week", "month", "year"].includes(variant)) {
        throw new Error("Invalid variant prop value. Must be day, week, month, or year.");
    }

    const { date, setters } = getDateValues();

    const typographyStyle = { 
        mx: 1,
        userSelect:"none",
        fontSize:matchesSm?"19px":"22px" 
    };

    const boxStyle = {
        display: "flex", 
        alignItems: "center",
        justifyContent:"flex-end",
        mx:0
    };

    return (
        <Box sx={boxStyle}>
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
});
export default CurrentDate;
