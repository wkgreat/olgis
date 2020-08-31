import React, {FC, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, Grid, Typography} from "@material-ui/core";
import {SERVICE_URL} from "../../components/common/utils";

const About: FC = () => {

    const [showDialog, setShowDialog] = useState(false);

    const onButtonClick = () => {
        setShowDialog(true);
    };

    const onClose = () => {
        setShowDialog(false);
    };

    return (
        <>
            <Button onClick={onButtonClick}>About</Button>
            <Dialog open={showDialog} onClose={onClose} aria-labelledby="About">
                <DialogTitle id="simple-dialog-title">About</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={3}><Typography variant="body1">当前后端地址</Typography></Grid>
                        <Grid item xs={9}><Typography variant="body1">{SERVICE_URL}</Typography></Grid>
                        <Grid item xs={3}><Typography variant="body1">作者</Typography></Grid>
                        <Grid item xs={9}><Typography variant="body1">Ke Wang</Typography></Grid>
                        <Grid item xs={3}><Typography variant="body1">邮箱</Typography></Grid>
                        <Grid item xs={9}><a href="mailto:wkgreat@outlook.com"><Typography variant="body1">wkgreat@outlook.com</Typography></a></Grid>
                        <Grid item xs={3}><Typography variant="body1">GitHub源码</Typography></Grid>
                        <Grid item xs={9}><a href="https://github.com/wkgreat/olgis"><Typography variant="body1">https://github.com/wkgreat/olgis</Typography></a></Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default About;
