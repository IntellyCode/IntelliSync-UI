import React, { memo, useCallback, useRef, useState } from 'react';
import { IconButton, Drawer } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { getSharedVariables } from '@ContextProviders';
import { FlexBox, Search, SearchIconWrapper, StyledInputBase } from "@ReusableComponents";

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
        <FlexBox variant="full-box" direction="column" sx={style}>
            <FlexBox variant="full-box" direction="column" sx={innerStyle}>
            </FlexBox>
        </FlexBox>
    );
});

const SearchBar = memo(({ mobile }) => {

    if (mobile) {
        return <MobileSearchBar />;
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

function MobileSearchBar() {
    const [showDrawer, setShowDrawer] = useState(false);
    const handleSearchClick = useCallback(() => {
            setShowDrawer(true);
    }, []);

    
    return (
        <>
            <IconButton sx={{ cursor: "default", p: 1 }} onClick={handleSearchClick}>
                <SearchIcon />
            </IconButton>
            <SearchDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
        </>
    );
}

function SearchDrawer( { showDrawer, setShowDrawer } ){
    const SharedVariables = getSharedVariables();
    const inputRef = useRef();

    
    const [showBottomDrawer, setShowBottomDrawer] = useState(false);
    

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
    
    return(
        <Drawer anchor="top" open={showDrawer} onClose={handleDrawerClose}
                sx={{ width: "100%", backgroundColor: "transparent" }}>
                <FlexBox variant="full-box"
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
                </FlexBox>
                <DropdownMenu visible={showBottomDrawer} />
            </Drawer>
    )
}
export default SearchBar;
