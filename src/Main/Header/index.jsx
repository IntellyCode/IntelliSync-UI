import { AppBar, Toolbar, IconButton, Accordion, AccordionSummary, AccordionDetails,Box } from "@mui/material";
import { getDateValues } from "@ContextProviders";
import { useModeView } from "../CalendarFrame";
import { getSharedVariables } from '@ContextProviders';
import { useState, memo, useMemo, useCallback } from "react";
import { FullToolBar, FullAppBar } from "@ReusableComponents";
import { smallerThan, largerThan } from "@Utils";
import MenuIcon from '@mui/icons-material/Menu';
import Navigator from "./Navigator";
import CurrentDate from "./CurrentDate";
import SearchBar from "./SearchBar";
import CalendarMode from "./CalendarMode";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { FullBox } from "@ReusableComponents"
import { Share } from "@mui/icons-material";

export default memo(function Header({ handleDrawer }) {
  const { date, setters } = getDateValues();
  const { modes, views } = useModeView();
  const SharedVariables = getSharedVariables();

  const [open, setOpen] = useState(false);

  const matches ={
    sm: smallerThan('sm'),
    md: smallerThan('md'),
  }

  const handleAccordion = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const iconButtonStyles = useMemo(() => ({
    display: "flex",
    alignItems: "center",
    mx: matches.sm ? 0 : 2,
    p: matches.sm ? 0 : 2,
    "&:focus": {
      outline: "none"
    }
  }), [matches.sm]);

  const accordionSummary = useMemo(() => ({
    px: matches.sm ? 1 : 4,
    height: SharedVariables.navBarHeight,
    width: 1,
  }), [matches.sm, SharedVariables.navBarHeight]);

  const renderAccordion = useMemo(() => (
    <Accordion variant="fullWidth"
      disableGutters expanded={open} >
      <AccordionSummary variant="centeredContent"
        sx={accordionSummary}
      >
        <FullBox direction="row" content="space-between"
          sx={{px: matches.sm ? 1: 3}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={iconButtonStyles}
            onClick={handleDrawer}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>
          <FullBox direction="row" content="center"
            onClick={handleAccordion} >
            <CurrentDate variant={modes.mode} />
            <ArrowDropDownIcon fontSize={matches.sm ? "medium" : "large"} sx={{
              transform: open ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "transform 200ms"
            }} />
          </FullBox>
          <SearchBar mobile={matches.md} />
        </FullBox>
      </AccordionSummary>
      <AccordionDetails variant="even-content"
        sx={{backgroundColor: "primary.main"}}>
        <CalendarMode variant="condensed" mobile={matches.sm} />
      </AccordionDetails>
    </Accordion>
  ), [accordionSummary, handleAccordion, handleDrawer, iconButtonStyles, matches.md, matches.sm, modes.mode, open, SharedVariables.navBarHeight]);

  const renderAppBar = useMemo(() => (
    <FullAppBar position="static" minheight={SharedVariables.navBarHeight}>
      <FullToolBar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={iconButtonStyles}
          onClick={handleDrawer}>
          <MenuIcon fontSize="medium" />
        </IconButton>
        <Navigator />
        <CurrentDate variant={modes.mode} />
        <FullBox direction ="row" sx={{justifyContent: "flex-end"}}>
          <SearchBar />
          <CalendarMode />
        </FullBox>
      </FullToolBar>
    </FullAppBar>
  ), [handleDrawer, iconButtonStyles, modes.mode, SharedVariables.navBarHeight]);

  return matches.md ? renderAccordion : renderAppBar;
});