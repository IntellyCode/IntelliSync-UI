import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const FullBox = styled(Box)(({ theme,direction="row",content="center" }) => ({
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: direction === 'row' ? 'row' : 'column',
    justifyContent:content,
    boxSizing: "border-box"
}));

FullBox.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
  content: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
};

