/**
 * This is a Year view component
 * It takes up the full widht and height of the available space
 * It is a grid element with 3 rows and 4 columns
 * Each grid contains a month component
 * Depending on the year that is from the context provider, it will display the correct year
 * And the dates for each month
 */

import React from "react";
import {FullBox} from "@ReusableComponents"
import MonthMobile from "../Month/MonthMobile";
import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { isResizing } from "@ContextProviders/ResizingProvider";
import { getSharedVariables } from "@ContextProviders/SharedVariablesProvider";
const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Year({ yearClass }) {
    //const {width,height} = isResizing();
    const SharedVariables = getSharedVariables();
    const theme = useTheme();
    const greaterThanLg = useMediaQuery(theme.breakpoints.up("xl"))
    const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"))
    const greaterThanSm = useMediaQuery(theme.breakpoints.up("sm"))
    const rowsColumns = {
        gridTemplateRows: greaterThanMd ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
        gridTemplateColumns: greaterThanMd ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
    }
    return (
        <FullBox
            direction="row"
            sx={{
                display: "grid",
                width: 1,
                height: 1,
                p: greaterThanLg ? 10 : greaterThanMd ? 5 : greaterThanSm ? 4 : 2,
                gap: greaterThanLg ? 12 : greaterThanMd ? 6 : 3,
                ...rowsColumns,
                overflow: "scroll",
                overscrollBehavior: "none"
            }}
        >
            {yearClass.months.map((month, i) => {
                return (
                    <FullBox
                    direction="column"
                        key={i}
                        sx={{
                            justifyContent: "flex-start",
                            minHeight: !greaterThanMd?"180px":"120px",
                        }}>
                        <FullBox
                            key={i}
                            direction="column"
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                px: 1.8
                            }}>
                            <Typography variant="body2" sx={{
                                fontSize: !greaterThanSm ? "10px" : "14px",
                                color: "red",

                            }}>{monthsArray[i]}</Typography>
                        </FullBox>
                        <MonthMobile monthClass={month} />
                    </FullBox>
                );
            })}
        </FullBox>
    )

}

