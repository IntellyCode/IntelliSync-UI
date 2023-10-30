import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const FullBox = styled(Box)(({ theme,direction="row" }) => ({
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: direction === 'row' ? 'row' : 'column',
}));

FullBox.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
};

export default FullBox;