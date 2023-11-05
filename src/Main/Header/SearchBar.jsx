import React, { memo, useCallback, useRef, useState } from 'react';
import { IconButton, Drawer } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { getSharedVariables } from '@ContextProviders';
import { FullBox, Search, SearchIconWrapper, StyledInputBase } from "@ReusableComponents";

function vhToPixels(value) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (value * height) / 100;
}

const DropdownMenu = memo(({ visible }) => {
  const SharedVariables = getSharedVariables();
  const maxHeight = vhToPixels(100) - SharedVariables.navBarHeight;
  const style = {
    height: visible ? `${maxHeight}px` : "0px",
    transition: "height 200ms",
    justifyContent: "flex-end",
  };
  const innerStyle = {
    display: visible ? "flex" : "none",
  };
  return (
    <FullBox direction="column" sx={style}>
      <FullBox direction="column" sx={innerStyle}>
      </FullBox>
    </FullBox>
  );
});

const SearchBar = memo(({ mobile }) => {
  const SharedVariables = getSharedVariables();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showBottomDrawer, setShowBottomDrawer] = useState(false);
  const inputRef = useRef();

  const handleSearchClick = useCallback(() => {
    if (mobile) {
      setShowDrawer(true);
    }
  }, [mobile]);

  const handleDrawerClose = useCallback(() => {
    setShowDrawer(false);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (inputRef.current.value.length === 0) {
      setShowBottomDrawer(false);
    }
  }, []);

  const handleInputFocus = useCallback(() => {
    setShowBottomDrawer(true);
  }, []);

  if (mobile) {
    return (
      <>
        <IconButton sx={{ cursor: "default", p: 1 }} onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
        <Drawer anchor="top" open={showDrawer} onClose={handleDrawerClose}
          sx={{ width: "100%", backgroundColor: "transparent" }}>
          <FullBox direction="row"
            style={{
              height: `${SharedVariables.navBarHeight}px`,
              justifyContent: "space-between",
            }} >
            <IconButton sx={{ cursor: "default", m: 2, p: 3 }} onClick={handleDrawerClose}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Search style={{ width: "70%" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                inputRef={inputRef}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                style={{ width: "100%" }}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
              />
            </Search>
          </FullBox>
          <DropdownMenu visible={showBottomDrawer} />
        </Drawer>
      </>
    );
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
});

export default SearchBar;
