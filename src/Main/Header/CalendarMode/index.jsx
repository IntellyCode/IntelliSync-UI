import React, { useState, useCallback, useMemo, memo } from "react";
import { Menu, Box, Button, MenuItem, Divider, Grid, Checkbox, ButtonBase, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SquareIcon from '@mui/icons-material/Square';
import CheckIcon from '@mui/icons-material/Check';

import { useModeView } from "@Main/CalendarFrame";
import { FlexBox } from "@ReusableComponents"
import { OptionsGroup } from "./OptionsGroup";
import { CondensedCalendarMode } from "./CondensedCalendarMode";
const commonButtonStyle = {
  width: 100,
  boxShadow: "none",
  border: "1px solid #E9E9E9",
  "&:hover": {
    border: "1px solid #E9E9E9",
    boxShadow: "none",
  }
};

const menuItemStyle = { px: 4, m: 0, cursor: "pointer" };

const modeOptions = [
  { mode: "day", text: "Day" },
  { mode: "week", text: "Week" },
  { mode: "month", text: "Month" },
  { mode: "year", text: "Year" },
];

export const CalendarMode = memo(({ variant, mobile }) => {
  const { modes } = useModeView();
  const [anchorEl, setAnchorEl] = useState(null);
  const [view, setView] = useState("Calendar");
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((mode) => {
    if (mode !== modes.mode && mode !== "inherit") {
      modes.setMode(mode);
    }
    setAnchorEl(null);
  }, [modes]);

  const handleView = useCallback((event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  }, []);


  if (variant === "condensed") {
    return <CondensedCalendarMode modeOptions={modeOptions} mobile={mobile} />
  }

  return (
    <FlexBox sx={{
      my: 2
    }}>
      <Button
        variant="contained"
        color="primary"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={commonButtonStyle}
      >
        {modes.mode}<KeyboardArrowDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose("inherit")}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 2,
          '& .MuiPaper-root': {
            minWidth: 180
          }
        }}>
        {modeOptions.map((option, index) => (
          <MenuItem key={index} onClick={() => handleClose(option.mode)} sx={menuItemStyle}>
            <Typography sx={{fontSize:"16px"}}>{option.text}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <OptionsGroup />
      </Menu>
    </FlexBox>
  )
});
