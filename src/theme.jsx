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
  breakpoints: {
    values: {
      xxs: 0,
      xs: 253,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  },
  spacing: (factor) => `${0.25 * factor}rem`,
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
    },
    MuiDivider: {
      variants: [
        {
          props: { variant: "fullWidth" },
          style: {
            width: "100%",
            height: "1px"
          },
        },
      ],
    },
    MuiAccordion: {
      variants: [
        {
          props: { variant: "noShadow" },
          style: {
            backgroundColor: "rgb(0,0,0,0)",
            boxShadow: "none"
          }
        }
      ]
    },
    //Accordion summary component variant with display flex and everything centerd and spaced-between
    MuiAccordionSummary: {
      variants: [
        {
          props: { variant: "centeredContent" },
          style: {
            display: 'flex',
            alignItems: 'center',
            "& .MuiAccordionSummary-content": {
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: "default"
            }
          }
        }
      ]
    },
    MuiAccordionDetails: {
      variants: [
        {
          props: { variant: "even-content" },
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: "100%",
            flexWrap: "wrap",
          }}
      ]
    }
  },
});

export default theme;