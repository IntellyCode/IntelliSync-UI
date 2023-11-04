import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function smallerThan(size) {
    const allowedSizes = ["xs", "sm", "md", "lg", "xl"];
    if (!allowedSizes.includes(size)) {
      throw new Error(`Invalid size: ${size}. Allowed sizes are: ${allowedSizes.join(", ")}`);
    }
    const breakpoints = useTheme().breakpoints;
    return useMediaQuery(breakpoints.down(size));
  }
  
  export function largerThan(size) {
    const allowedSizes = ["xs", "sm", "md", "lg", "xl"];
    if (!allowedSizes.includes(size)) {
      throw new Error(`Invalid size: ${size}. Allowed sizes are: ${allowedSizes.join(", ")}`);
    }
    const breakpoints = useTheme().breakpoints;
    return useMediaQuery(breakpoints.up(size));
  }


