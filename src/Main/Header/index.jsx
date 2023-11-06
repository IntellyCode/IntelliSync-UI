import { AppBar, Toolbar, IconButton, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
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
import {CalendarMode} from "./CalendarMode";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { FlexBox } from "@ReusableComponents"
import { Share } from "@mui/icons-material";

const AccordionHeader = memo(({ handleDrawer, handleAccordion, open, matches, modes }) => {
  const SharedVariables = getSharedVariables();

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

  return (
    <AccordionSummary variant="centeredContent"
      sx={accordionSummary}
    >
      <FlexBox variant="full-box" direction="row" content="space-between"
        sx={{ px: matches.sm ? 1 : 3 }}>
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
        <FlexBox variant="full-box" direction="row" content="center"
          onClick={handleAccordion} >
          <CurrentDate variant={modes.mode} />
          <ArrowDropDownIcon fontSize={matches.sm ? "medium" : "large"} sx={{
            transform: open ? "rotate(-180deg)" : "rotate(0deg)",
            transition: "transform 200ms"
          }} />
        </FlexBox>
        <SearchBar mobile={matches.md} />
      </FlexBox>
    </AccordionSummary>
  );
});

const AccordionContent = memo(({ matches, modes }) => (
  <AccordionDetails variant="even-content"
    sx={{ backgroundColor: "primary.main" }}>
    <CalendarMode variant="condensed" mobile={matches.sm} />
  </AccordionDetails>
));

const AppBarHeader = memo(({ handleDrawer, modes }) => (
  <>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ display: "flex", alignItems: "center", mx: 2, p: 2, "&:focus": { outline: "none" } }}
      onClick={handleDrawer}>
      <MenuIcon fontSize="medium" />
    </IconButton>
    <Navigator />
    <CurrentDate variant={modes.mode} />
    <FlexBox variant="full-box" direction="row" sx={{ justifyContent: "flex-end" }}>
      <SearchBar />
      <CalendarMode />
    </FlexBox>
  </>
));

export default memo(function Header({ handleDrawer }) {
  const { modes } = useModeView();
  const matches = {
    sm: smallerThan('sm'),
    md: smallerThan('md'),
  }

  const [open, setOpen] = useState(false);

  const handleAccordion = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const SharedVariables = getSharedVariables();

  const renderAccordion = useMemo(() => (
    <Accordion variant="fullWidth"
      disableGutters expanded={open} >
      <AccordionHeader handleDrawer={handleDrawer} handleAccordion={handleAccordion} open={open} matches={matches} modes={modes} />
      <AccordionContent matches={matches} modes={modes} />
    </Accordion>
  ), [handleAccordion, handleDrawer, matches, modes, open]);

  const renderAppBar = useMemo(() => (
    <FullAppBar position="static" minheight={SharedVariables.navBarHeight}>
      <FullToolBar>
        <AppBarHeader handleDrawer={handleDrawer} modes={modes} />
      </FullToolBar>
    </FullAppBar>
  ), [handleDrawer, modes, SharedVariables.navBarHeight]);

  return matches.md ? renderAccordion : renderAppBar;
});
