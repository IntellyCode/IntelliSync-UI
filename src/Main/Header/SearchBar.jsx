import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Drawer from '@mui/material/Drawer';
import { styled, alpha } from '@mui/material/styles';
import { getSharedVariables } from '../ContextProviders';
import FullBox from '../ReusableComponents/FullBox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function vhToPixels(value) {
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (value * height) / 100;
}
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    },
    border: "1px solid #E9E9E9",
    borderRadius: "5px",
    margin: "0 20px",
    width: 'fit-content',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        '&:focus': {
            borderRadius: "5px",
            boxShadow: "0 0 10px 3px orange"
        },
    },
}));

function SearchBar({ mobile }) {
    const SharedVariables = getSharedVariables();
    const [showDrawer, setShowDrawer] = React.useState(false);
    const [showBottomDrawer, setShowBottomDrawer] = React.useState(false);
    const handleSearchClick = () => {
        if (mobile) {
            setShowDrawer(true);
        }
    };

    const handleDrawerClose = () => {
        setShowDrawer(false);
    };

    if (mobile) {
        return (
            <>
                <IconButton sx={{ cursor: "default", p: 1,}} onClick={handleSearchClick}>
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
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                style={{ width: "100%" }}
                                onBlur={() => { setShowBottomDrawer(false)}}
                                onFocus={() => { setShowBottomDrawer(true) }}
                            />
                        </Search>
                    </FullBox>
                    <DropdownMenu visible={showBottomDrawer}/>
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
}

function DropdownMenu({ visible }) {
    const SharedVariables = getSharedVariables();
    const maxHeight = vhToPixels(100) - SharedVariables.navBarHeight;
    const style={
        height:visible?`${maxHeight}px`:"0px",    
        transition:"height 200ms",
        justifyContent:"flex-end",
    }
    const innerStyle={
        display:visible?"flex":"none",
    }
    return ( 
        <FullBox direction="column" sx={style}>
            <FullBox direction="column" sx={innerStyle}>

            </FullBox>
        </FullBox>
    )
}
export default SearchBar;