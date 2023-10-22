import React, { useRef, forwardRef, useEffect,useState } from "react";

import FullBox from "@ReusableComponents/FullBox";
import Day from "./Day";

export default function Month({ monthClass }) {
  const monthArray = monthClass.getDays();
  const ref = useRef(null);
  
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const containerElement = ref.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    if (containerElement) {
      resizeObserver.observe(containerElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
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
                containerSize={containerSize}/>;
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
