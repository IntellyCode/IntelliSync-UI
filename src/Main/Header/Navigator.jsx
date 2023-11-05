import React, { memo, useCallback, useMemo } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useModeView } from "@Main/CalendarFrame";
import { getDateValues } from '@ContextProviders';

const NavigatorButton = memo(({ onClick, children }) => (
  <Button variant="contained" color="primary" onClick={onClick} 
    sx={{mx:1, boxShadow:"0px 0px 7px 0px rgba(0,0,0,0.5);"}}>
    {children}
  </Button>
));

const NavigatorIconButton = memo(({ onClick, children }) => (
  <IconButton onClick={onClick} sx={{p:0}}>
    {children}
  </IconButton>
));

const modesMap = new Map([
  ["day",{setter:"setDayOffset",modifier:1}],
  ["month",{setter:"setMonthOffset",modifier:1}],
  ["year",{setter:"setYearOffset",modifier:1}],
  ["week",{setter:"setDayOffset",modifier:7}]
]);

function Navigator() {
  const { modes } = useModeView();
  const { date, setters } = getDateValues();

  const mode = useMemo(() => modesMap.get(modes.mode), [modes.mode]);
  const changeDate = useCallback((operation) => {
    setters[mode.setter](date => operation === 'add' ? date + mode.modifier : date - mode.modifier);
  }, [setters, mode]);

  const substract = useCallback(() => {
    changeDate('substract');
  }, [changeDate]);

  const add = useCallback(() => {
    changeDate('add');
  }, [changeDate]);

  const reset = useCallback(() => {
    setters.setDayOffset(0);
    setters.setMonthOffset(0);
    setters.setYearOffset(0);
  }, [setters]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 3 }}>
      <NavigatorIconButton onClick={substract}>
        <ChevronLeftIcon sx={{ color: "primary.contrastText",p:1 }} fontSize="large"/>
      </NavigatorIconButton>
      <NavigatorButton onClick={reset}>
        Today
      </NavigatorButton>
      <NavigatorIconButton onClick={add}>
        <ChevronRightIcon sx={{ color: "primary.contrastText",p:1 }} fontSize="large"/>
      </NavigatorIconButton>
    </Box>
  );
}

export default Navigator;
