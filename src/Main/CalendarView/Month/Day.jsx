import React, { useRef, useEffect, forwardRef, useState, useLayoutEffect } from 'react';
import FullBox from '@ReusableComponents/FullBox';
import { Typography, Box, ListItem } from '@mui/material';

const heightOfEvent = 16;

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function isOverflowing(ref, events, overflowFactor, containerSize) {
    const { width, height } = containerSize; //Just to ensure the function is run every time a parameter changes
    if (events.length == 0) return false;
    const emptyHeight = ref.current.clientHeight;
    const totalHeight = (events.length - (overflowFactor > 1 ? overflowFactor - 1 : 0)) * (heightOfEvent + heightOfEvent / 4);
    if (totalHeight >= emptyHeight) {
        return true;
    }
    return false;

}

export default function Day({ day, grayed, dayOfWeek, today, containerSize }) {
    const parentRef = useRef(null);
    const [events, setEvents] = React.useState([]);
    const [overflowFactor, setOverflowFactor] = useState(0);
    if (isOverflowing(parentRef, events, overflowFactor, containerSize)) {
        setOverflowFactor(overflowFactor + 1);
    } else if (!isOverflowing(parentRef, events, overflowFactor - 1, containerSize) && overflowFactor > 0) {
        setOverflowFactor(overflowFactor - 1);
    }
    const addEvents = () => {
        if (parentRef.current) {
            const emptyHeight = parentRef.current.clientHeight;
            setEvents([...events, < Event key={events.length} />]);
        }
    }

    const todayStyle = today ? {
        backgroundColor: "quaternary.main",
        borderRadius: "40px",
    } : null;

    const del = (index) => {
        const newEvents = events.slice(0, index).concat(events.slice(index + 1));
        setEvents(newEvents);
    }

    return (
        <FullBox
            direction="column"
            sx={{
                justifyContent: 'flex-start',
                borderLeft: '0.5px solid rgb(0,0,0,0.1)',
                borderRight: '0.5px solid rgb(0,0,0,0.1)',
                borderBottom: '0.5px solid rgb(0,0,0,0.1)',
                overflow: 'hidden',
                minHeight: '80px',

            }}
            onDoubleClick={addEvents}
        >
            {dayOfWeek != -1 &&
                <Typography variant="body2"
                    sx={{
                        color: "gray",
                        userSelect: "none"
                    }}>{weekdays[dayOfWeek]}
                </Typography>}
            <Typography variant="body2"
                sx={{
                    color: grayed ? 'gray' : 'primary.contrastText',
                    ...todayStyle,
                    py: 1,
                    px: 1.6,
                    userSelect: "none"

                }}>
                {day}
            </Typography>

            <FullBox direction="column" ref={parentRef}>
                {events.slice(0, events.length - overflowFactor).map((event, index) => (
                    <Event key={index} index={index} del={del} >New Event</Event>
                ))}
                {overflowFactor > 0 && <Event variant="more">{overflowFactor} More...</Event>}
            </FullBox>


        </FullBox>
    );
}
const Event = ({ children, del, index, variant = "default" }) => {
    const textColor = variant === "more" ? "gray" : "black";
    const boxStyle = {
      width: 0.95,
      height: `${heightOfEvent}px`,
      p: 0,
      my: `${heightOfEvent / 8}px`,
      px: 3,
      borderRadius: "3px",
      ...(variant !== "more" && {
        "&:focus": {
          outline: "0.5px solid white",
          backgroundColor: "orange",
          color: "white",
        },
      }),
    };
  
    const handleKeyPress = (event) => {
      if (variant === "more") return;
      if (event.key === "Backspace") {
        del(index);
      }
    };
  
    return (
      <Box
        tabIndex={0}
        sx={boxStyle}
        onKeyDown={handleKeyPress}
        onClick={(event) => {
          if (variant !== "more") event.target.focus();
        }}
        ref={(ref) => {
          if (ref && variant !== "more") {
            ref.focus();
          }
        }}
      >
        <p
          style={{
            height: "100%",
            padding: 0,
            margin: 0,
            fontSize: "12px",
            userSelect: "none",
            color: textColor,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {children}
        </p>
      </Box>
    );
  };