import { Toolbar } from "@mui/material";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const FullToolBar = styled(Toolbar)(({ theme }) => ({
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

FullToolBar.propTypes = {

};
