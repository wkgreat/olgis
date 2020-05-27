import React from "react";
import {Box, Grid} from "@material-ui/core";

const Logo = (props) => {

    return (
            <Box component='div' className={props.classes.logo}>
                {props.children}
            </Box>
    );

};

export default Logo;