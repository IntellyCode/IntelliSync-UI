import { AppBar } from "@mui/material";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const FullAppBar = styled(AppBar)(({ theme,minheight=0,backgroundColor="primary.main" }) => ({
    width: "100%",
    minHeight: `${minheight}px`,
    zIndex: 1,
    backgroundColor: backgroundColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "none"
}));

FullAppBar.propTypes = {
    minheight: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string
};
