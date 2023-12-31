import React, { useRef, forwardRef, useEffect, useState } from "react";
import { useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import {FlexBox} from "@ReusableComponents"
import DayMobile from "./DayMobile";
import { getSharedVariables } from "@ContextProviders/SharedVariablesProvider";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
export default function MonthMobile({ index, monthClass }) {
    const theme = useTheme();
    const monthArray = monthClass.getDays();
    const greaterThanSm = useMediaQuery(theme.breakpoints.up("sm"))
    return (
        <FlexBox variant="full-box"
            direction="column"
            sx={{
                display: "inline-grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gridTemplateRows: "repeat(7, 1fr)",
                maxWidth: "230px",
                height:1,                
            }}
        >
           
            {weekDays.map((day, index) => {
                return (
                    <FlexBox variant="full-box"
                        key={index}
                        direction="column"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <p style={{
                            color: theme.palette.primary.contrastText,
                            fontSize: !greaterThanSm ? "8px" : "9px",
                            userSelect: "none",
                            margin: "0px",
                            padding: `${theme.spacing(0.8)} 0px`,
                        }}>{day}</p>
                    </FlexBox>
                )
            })}
            {monthArray.map((week, i) => {
                return (
                    <React.Fragment key={i}>
                        {week.map((day, index) => {
                            let dayOfWeek = (i === 0) ? index : -1;
                            return <DayMobile
                                key={index}
                                day={day[0]}
                                month={monthClass.month}
                                grayed={day[1]}
                                today={day[2]} />;
                        })}
                    </React.Fragment>
                );
            })}
        </FlexBox>
    );
}
