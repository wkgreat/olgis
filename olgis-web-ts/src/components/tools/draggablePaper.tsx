import React, {FC} from "react";
import Draggable from 'react-draggable';
import Paper, {PaperProps} from "@material-ui/core/Paper";

const DraggablePaper: FC<PaperProps> = (props) => (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
    </Draggable>
);

export default DraggablePaper;