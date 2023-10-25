import React, { useRef, forwardRef, useEffect,useState } from "react";

import FullBox from "@ReusableComponents/FullBox";
import Day from "./Day";
import { isResizing } from "@ContextProviders";

export default function Month({ monthClass }) {
  const monthArray = monthClass.getDays();
  const ref = useRef(null);
  
  const containerInfo = isResizing();
  return (
    <Grid ref={ref}>
      {monthArray.map((week, i) => {
        return (
          <React.Fragment key={i}>
            {week.map((day, index) => {
              let dayOfWeek = (i === 0) ? index : -1;
              return <Day key={index}
                day={day[0]}
                grayed={day[1]}
                dayOfWeek={dayOfWeek}
                today={day[2]}
                containerSize={containerInfo}/>;
            })}
          </React.Fragment>
        );
      })}
    </Grid>
  );
}
const Grid = forwardRef(({ children }, ref) => {
  return (
    <FullBox
      ref={ref}
      direction="column"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
      }}
    >
      {children}
    </FullBox>
  );
}
);
