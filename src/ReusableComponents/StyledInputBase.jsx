import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
