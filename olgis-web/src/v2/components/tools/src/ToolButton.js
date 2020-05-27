import React from "react";
import IconButton from '@material-ui/core/IconButton';
import {Button} from "@material-ui/core";

const ToolButton = (props) => {

    return (

        <IconButton
            size='small'
            onClick={props.onClick}
        >
            {props.children}
        </IconButton>

    )

};