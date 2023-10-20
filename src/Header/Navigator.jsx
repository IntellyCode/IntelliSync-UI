import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Navigator() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',mx:3 }}>
      <Button variant="contained" color="primary" onClick={() => {/* Handle Today button click */}}>
        Today
      </Button>
      <IconButton  onClick={() => {/* Handle left button click */}}>
        <ChevronLeftIcon sx={{color:"primary.contrastText"}}/>
      </IconButton>
      <IconButton onClick={() => {/* Handle right button click */}}>
        <ChevronRightIcon sx={{color:"primary.contrastText"}}/>
      </IconButton>
    </Box>
  );
}

export default Navigator;
