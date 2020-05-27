import React from "react";
import Draggable from 'react-draggable';
import Paper from "@material-ui/core/Paper";

const DraggablePaper = (props) => (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
    </Draggable>
);

export default DraggablePaper;