import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Option } from './Option';
export const OptionsGroup = () => {
    const [checked, setChecked] = useState(1);
    const typographyStyle = { fontSize: "16px" };
    return (
      <Box>
        <Option checked={checked === 1} onToggle={() => setChecked(1)}>
          <Typography sx={typographyStyle}>Calendar</Typography>
        </Option>
        <Option checked={checked === 2} onToggle={() => setChecked(2)}>
          <Typography sx={typographyStyle}>Gantt</Typography>
        </Option>
      </Box>
    )
  }