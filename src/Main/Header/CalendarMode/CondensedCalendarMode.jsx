import React from "react";
import { useModeView } from "@Main/CalendarFrame";
import { FlexBox } from "@ReusableComponents"
import { Typography, Divider } from "@mui/material";
export const CondensedCalendarMode = ( { modeOptions, mobile } ) => {
    const { modes } = useModeView();
    const dividerStyle = {
        height: 0.8,
        m: 0,
        p: 0,
        width: "1px",
      };
  
      const condensedTypography = {
        mx: 3,
        cursor: "pointer",
        userSelect: "none",
        fontSize: mobile ? "14px" : "16px",
        width: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "fit-content",
      };
  
      return (
        <FlexBox variant="full-box"
          direction="row"
          sx={{
            height: "30px",
            justifyContent: "center",
          }}
        >
          {modeOptions.map((option, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="body2"
                sx={{
                  ...condensedTypography,
                  ...(modes.mode === option.mode && {
                    color: "tertiary.main",
                    fontWeight: "bold"
                  }),
                }}
                onClick={() => modes.setMode(option.mode)}
              >
                {option.text}
              </Typography>
              {index < modeOptions.length - 1 && <Divider orientation="vertical" sx={dividerStyle} />}
            </React.Fragment>
          ))}
        </FlexBox>
      );
};