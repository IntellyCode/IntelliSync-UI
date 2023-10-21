import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
function CurrentDate({ day, month, year }) {
    const typographyStyle = {mx:1}
    return (
        <Box sx={{display:"flex",alignItems:"center"}}>
            {day && (
                <Typography variant="h6" sx={typographyStyle}>
                    {day}
                </Typography>
            )}
            {month && (
                <Typography variant="h6"  sx={typographyStyle}>
                    {month}
                </Typography>
            )}

            <Typography variant="h6"  sx={typographyStyle}>
                {year}
            </Typography>
        </Box>
    );
}

export default CurrentDate;
