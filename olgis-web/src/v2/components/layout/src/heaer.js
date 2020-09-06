import React from "react";
import {Box} from "@material-ui/core";
import Menubar from "../../menubar/src";
import {useStyles} from "../../../style";

const Header = (props) => {

    const classes = useStyles();

    return (
        <Box
            display="flex"
            alignItems="center"
            className={classes.box}
            component="div">
            <Menubar classes={classes}/>
        </Box>
    );

};

export default Header;