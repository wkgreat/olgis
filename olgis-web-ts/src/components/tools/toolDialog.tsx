import React, {FC, ReactNode, useEffect, useState} from "react";
import DraggablePaper from "./draggablePaper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Box, Grid, GridSize, Typography} from "@material-ui/core";
import BaseToolProps from "./baseToolProps";

/**
 *  open
 *  title
 *  onOK
 *  onCancel
 *  children
 * */

type OnButtonClickCallBack = (event:React.MouseEvent<HTMLButtonElement, Event>) => void

export interface ToolDialogProps extends BaseToolProps{
    children ?: React.ReactNode
}

const ToolDialog: FC<ToolDialogProps> = ({open, title, enableOK, enableCancel, onOK, onCancel, children}) => {

    const [isOpen, setIsOpen] = useState(Boolean(open));

    useEffect(()=>{
        setIsOpen(Boolean(open));
    },[open]);

    if(isOpen) {
        return (
            <Dialog
                open={Boolean(open)}
                onClose={onCancel}
                PaperComponent={DraggablePaper}
                aria-labelledby="draggable-dialog-title"
                fullWidth={true}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    {enableCancel ? <Button autoFocus onClick={onCancel} color="primary">Cancel</Button> : null}
                    {enableOK ? <Button onClick={onOK} color="primary">Ok</Button> : null}
                </DialogActions>
            </Dialog>
        )
    } else {
        return <></>;
    }

}

ToolDialog.defaultProps = {
    enableOK: true,
    enableCancel: true
};

export default ToolDialog;

export const rowConfig = (label:string, xs1: 0|GridSize, xs2: 0|GridSize, row ?:boolean): (input:ReactNode)=>void => {
    return (input: ReactNode) => (

        <>
            {xs1==='auto' || xs1!==0 ? <Grid item xs={xs1}>
                <div style={{display:"flex", flexDirection:"row-reverse"}}>
                    <Typography id={label}>{label}</Typography></div></Grid> : <></>}
            {xs2==='auto' || xs2!==0 ? <Grid item xs={xs2}>{input}</Grid>: <></>}
            {xs1!=='auto' && xs2!=='auto' && row && xs1+xs2<12 ? <Grid item xs={12-xs1-xs2 as GridSize}/> : <></>}
        </>
    );
};


export const showTitle = (title:string):ReactNode => {
    return (
        <div style={{display: "flex", flexDirection: "column", width: '100%'}}>
            <Box css={{display: "inline-block"}}>
                {title ? <Typography variant="h6"> {title} </Typography> : null}
            </Box>
        </div>
    )
};

export const showButton = (enableOK: boolean, onOK: (event: any)=>void, enableCancel: boolean, onCancel:(event: any)=>void):ReactNode => {
    return (
        <Box css={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
            {enableCancel ? <Button variant="outlined" size="small" color="secondary" onClick={onCancel}>Cancel</Button> : null}
            {enableOK ? <Button variant="outlined" size="small" color="secondary" onClick={onOK}>OK</Button> : null}
        </Box>
    )
};