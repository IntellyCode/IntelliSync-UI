import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useModeView } from "@/App_right";
import { getOffsetValues } from '@/ContextProviders';
function Navigator() {
    const { modes, views } = useModeView();
    const { date, setters } = getOffsetValues();
    function substract(){
        if(modes.mode=="day"){
            setters.setDayOffset(date=>date-1)
        }
        else if(modes.mode=="week"){
            setters.setDayOffset(date=>date-7)
        }
        else if(modes.mode=="month"){
            setters.setMonthOffset(date=>date-1)
        }
        else if(modes.mode=="year"){
            setters.setYearOffset(date=>date-1)
        }
    }
    function add(){
        if(modes.mode=="day"){
            setters.setDayOffset(date=>date+1)
        }
        else if(modes.mode=="week"){
            setters.setDayOffset(date=>date+7)
        }
        else if(modes.mode=="month"){
            setters.setMonthOffset(date=>date+1)
        }
        else if(modes.mode=="year"){
            setters.setYearOffset(date=>date+1)
        }
    }
    function reset(){
        setters.setDayOffset(0);
        setters.setMonthOffset(0);
        setters.setYearOffset(0);
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 3 }}>
            <IconButton onClick={substract} sx={{p:0}}>
                <ChevronLeftIcon sx={{ color: "primary.contrastText",p:1 }} fontSize="large"/>
            </IconButton>
            <Button variant="contained" color="primary" onClick={reset} sx={{mx:1}}>
                Today
            </Button>

            <IconButton onClick={add} sx={{p:0}}>
                <ChevronRightIcon sx={{ color: "primary.contrastText",p:1 }} fontSize="large"/>
            </IconButton>
        </Box>
    );
}

export default Navigator;
