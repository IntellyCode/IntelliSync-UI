import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      contrastText: "#483C46"
    },
    secondary: {
      main: "#E9E9E9",
      contrastText: "#f4a73b"
    },
    tertiary: {
      main: "#3C6E71",
      light: "#8abfc1"
    },
    quaternary: {
      main: "#f4a73b",
      light: "#f9d49f"
    },
    checkbox: {
      gray: "#858585",
      red: "#f72925",
      blue: "#5b96f5"
    },
    error: {
      main: "#f72925"
    },
    success: {
      main: "#0ab807",
      light: "#9ffb9d"
    },
    missing: {
      main: "#858585",
      light: "#cccccc"
    },
    outline: {
      main: "#d9dbde"
    }

  },
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none", // Remove the default focus outline
          },
          borderRadius: "10px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none", // Remove the default focus outline
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none", // Remove the default focus outline
          },
        },
      },
    }
  },
});

export default theme;