import React, {useEffect} from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TOC from "../../toc/src";
import {useStyles} from "../../../style";
import {default as InnerDrawer} from "@material-ui/core/Drawer";

const Drawer = (props) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open || false);

    useEffect(()=>{
        setOpen(props.open);
    }, [props.open]);

    return (
        <InnerDrawer
            variant="permanent"
            PaperProps={{
                elevation: 4,
                style: {
                    opacity: 0.95
                }
            }}
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <Box>
                <Box className={classes.drawerHeader}>
                    <Typography variant="button"> OLGIS </Typography>
                </Box>
                <Divider />
                <TOC/>
            </Box>

        </InnerDrawer>
    )

};

export default Drawer;