import React, {Component} from "react";
import DraggablePaper from "./DraggablePaper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

/**
 *  open
 *  title
 *  onOK
 *  onCancel
 *  children
 * */
const ToolDialog = (props) => (
    <Dialog
        open={props.open}
        onClose={props.onCancel}
        PaperComponent={DraggablePaper}
        aria-labelledby="draggable-dialog-title"
    >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            {props.title}
        </DialogTitle>
        <DialogContent>
            {props.children}
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={props.onCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={props.onOK} color="primary">
                Ok
            </Button>
        </DialogActions>
    </Dialog>
);

export default ToolDialog;