import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const Search = styled('div')(({ theme }) => ({
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