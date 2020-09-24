import React, {FC, ReactNode, useEffect, useState} from "react";
import DraggablePaper from "./draggablePaper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Box, Grid, GridSize, IconButton, Theme, Typography} from "@material-ui/core";
import BaseToolProps from "./baseToolProps";
import {makeStyles} from "@material-ui/core/styles";
import MemoryTwoToneIcon from '@material-ui/icons/MemoryTwoTone';
import {DialogProps} from "@material-ui/core/Dialog/Dialog";
import {RequestProgress} from "../../hooks/useRequestProgress";
import ProgressBar from "../common/progressbar";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useSnackbar} from 'notistack';

/**
 *  open
 *  title
 *  onOK
 *  onCancel
 *  children
 * */

const useStyles = makeStyles((theme: Theme) => ({

    root: {
        backgroundColor: "transparent",
        pointerEvents: "none"
    },
    paper: {
        pointerEvents: "auto",
    },
    title: {
        backgroundColor: theme.palette.primary.main,
        height: 15,
        font : "10px Arial"
    }

}));

interface BaseToolDialogProps {
    showProgress ?: boolean
    progress ?: RequestProgress
}

export type ToolDialogProps = BaseToolProps & DialogProps & BaseToolDialogProps;

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ToolDialog: FC<ToolDialogProps> = (props) => {

    const {
        open,
        title,
        enableOK,
        enableCancel,
        onOK,
        onCancel,
        children,
        progress,
        showProgress,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = useState(Boolean(open));
    const [_showProgress, _setShowProress] = useState<boolean|undefined>(showProgress);
    const [_progress, _setProress] = useState<RequestProgress|undefined>(progress);

    const { enqueueSnackbar } = useSnackbar();

    const classes = useStyles();
    Object.assign(classes, rest.classes);

    useEffect(()=>{
        setIsOpen(Boolean(open));
    },[open]);

    useEffect(()=>{
        if(showProgress!==_showProgress) {
            _setShowProress(showProgress);
        }
        if(progress!==_progress) {
            displayProgress(progress);
            _setProress(progress);
        }

    }, [showProgress, progress]);

    //"SESSION_OPEN" | "SESSION_CLOSE" | "SESSION_ERROR" | "RUNNING" | "FINISHED" | "FAILED"
    const displayProgress = (progress ?: RequestProgress): void => {
        if(progress && progress.status) {
            const status = progress.status;
            if(status==="SUCCESS") {
                enqueueSnackbar(`SUCCESS: ${progress?.requestId} 执行成功`, {variant: 'success'});
            }
            if(status==="FAILED") {
                enqueueSnackbar(`ERROR: ${progress?.requestId} 执行失败 MSG: ${progress?.message}`, {variant: 'error'});
            }
            if(status==="SESSION_OPEN") {
                enqueueSnackbar(`INFO: ${progress?.requestId} 进度会话开始`, {variant: 'info'});
            }
            if(status==="SESSION_CLOSE") {
                enqueueSnackbar(`INFO: ${progress?.requestId} 进度会话关闭`, {variant: 'info'});
            }
            if(status==="SESSION_ERROR") {
                enqueueSnackbar(`WARN: ${progress?.requestId} 进度会话失败 MSG: ${progress?.message}`, {variant: 'warning'});
            }
        }
    };

    if(isOpen) {
        return (
            <Dialog
                classes={{
                    root: classes.root,
                    paper: classes.paper,
                }}
                hideBackdrop={true}
                open={Boolean(open)}
                onClose={onCancel}
                PaperComponent={DraggablePaper}
                aria-labelledby="draggable-dialog-title"
                fullWidth={true}
                disableBackdropClick={true}
                scroll="paper"
            >
                {title ?
                    <DialogTitle className={classes.title}
                                 style={{ cursor: 'move' }}
                                 id="draggable-dialog-title"
                                 disableTypography={false}
                    >
                        <Box display="flex" alignItems="center">
                            <Box><IconButton><MemoryTwoToneIcon/></IconButton></Box>
                            <Box>{title}</Box>
                        </Box>
                    </DialogTitle> :
                    <></>}
                {progress && progress.status==='RUNNING' ? <ProgressBar autoShow={true} value={progress?.progress}/> : <></>}
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

};

ToolDialog.defaultProps = {
    enableOK: true,
    enableCancel: true,
    showProgress: true
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
