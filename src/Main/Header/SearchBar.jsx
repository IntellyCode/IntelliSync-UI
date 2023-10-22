import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ mobile }) {
    if (mobile) {
        return (
            <IconButton  sx={{ cursor: "default", p: 3, m: 2 }}>
                <SearchIcon />
            </IconButton>
        )
    }
    return (
        <TextField
            variant='outlined'
            type="search"
            sx={{
                mx: 3,
                minWidth: mobile ? "80px" : "100px",
                width: mobile ? "80px" : "auto",

            }}
            InputProps={{

                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton disableRipple sx={{ cursor: "default", p: 0, m: 0 }}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            inputProps={{
                style: {
                    height: "30px",
                    padding: 0,
                },
            }}
        />
    );
}

export default SearchBar;
