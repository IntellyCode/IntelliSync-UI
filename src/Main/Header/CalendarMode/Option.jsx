import React from "react";
import { Grid, Checkbox, ButtonBase } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
const menuItemStyle = { px: 4, m: 0, cursor: "pointer" };
export const Option = ({ checked, onToggle, children }) => {

    const gridItemStyle = { display: "flex", alignItems: "center" };
    const grid = {
      "&:hover": {
        backgroundColor: "secondary.main"
      }
    };
  
    return (
      <ButtonBase sx={{
        display: "block",
        width: 1,
        borderRadius: 0,
        "&:focus": {
          outline: "none"
        }
      }}>
        <Grid container sx={{ ...menuItemStyle, ...grid }} onClick={onToggle}>
          <Grid item xs={3} sx={gridItemStyle}>
            <Checkbox
              icon={<CheckIcon sx={{ color: "transparent" }} />}
              checkedIcon={<CheckIcon sx={{ color: "black" }} />}
              checked={checked}
              disableFocusRipple
              disableRipple
            />
          </Grid>
          <Grid item xs={8} sx={{ ...gridItemStyle, justifyContent: "center" }}>{children}</Grid>
        </Grid>
      </ButtonBase>
    )
  }
  