import React from 'react';
import Typography from '@mui/material/Typography';
import FullBox from '@ReusableComponents/FullBox';
import { useState } from 'react';
import { getDateValues } from '@ContextProviders';
import { useModeView } from "@/App_right";
export default function DayMobile({ day,month,year, grayed, today }) {
    const {date,setters} = getDateValues();
    const {modes,views}=useModeView();
    const [event,setEvent] = useState(null);
    const todayStyle = today ? {
        backgroundColor: "quaternary.main",
        borderRadius: "40px",
    } : null;
    return (
        <FullBox direction="column"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Typography variant="body2"
                sx={{
                    color: grayed ? 'gray' : 'primary.contrastText',
                    ...todayStyle,
                    py: 0.8,
                    px: 1.3,
                    userSelect: "none",
                    width:"20px",
                    fontSize: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "1/1",
                    borderRadius: "40px",
                    "&:hover":{
                        backgroundColor:"secondary.main",
                    },
                    m:"1px",
                    cursor:"pointer",
                }}
                onClick={() => {
                    setters.setDay(day);
                    setters.setMonth(month);
                    modes.setMode("day");
                } 
                }
            >
                {day}
            </Typography>
            {event!=null&&<div style={{
                backgroundColor: "rgb(0,0,255,0.2)",
                height: "4px",
                width: "4px",
                borderRadius: "50%",
                margin:"1px"
            }}></div>}
        </FullBox>
    )
}