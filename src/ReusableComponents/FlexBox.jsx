import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const FlexBox = styled(Box)(({ theme, direction = "row", content = "center", variant = "default" }) => {
    let style = {
        display: "flex",
        alignItems: "center",
        flexDirection: direction === 'row' ? 'row' : 'column',
        justifyContent: content,
        boxSizing: "border-box",
    }
    if (variant==="full-box") {
        style = {
            ...style,
            width:"100%",
            height:"100%"
        }
    } else if (variant==="full-width") {
        style = {
            ...style,
            width:"100%"
        }
    }else if (variant==="full-height") {
        style = {
            ...style,
            height:"100%"
        }
    }
    return (
       {
        ...style
       })
});

FlexBox.propTypes = {
    direction: PropTypes.oneOf(['row', 'column']),
    content: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
    variant: PropTypes.oneOf(['default', 'full-box', 'full-width', 'full-height'])
};

