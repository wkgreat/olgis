import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import React from "react";

const drawerWidth = 300;
const headerHeight = 28;

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

export const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },
    appBar: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        backgroundColor: darkTheme.palette.background.default,
        height: headerHeight,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0
    },
    header: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        height: headerHeight,
        minHeight: headerHeight,
        //display: 'flex',
        //alignItems: 'center',
        //justifyContent: 'flex-end',
        // // necessary for content to be below app bar
        // ...theme.mixins.toolbar,
    },
    toolbar: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        height: headerHeight,
        minHeight: headerHeight,
        //display: 'flex',
        //alignItems: 'center',
        //justifyContent: 'flex-end',
        // // necessary for content to be below app bar
        // ...theme.mixins.toolbar,
    },
    drawerHeader: {
        paddingLeft: theme.spacing(2),
        width: '100%',
        height: headerHeight,
        border: '0px',
        display: "flex",
        alignItems: "center"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    },
    map: {
        position: 'absolute',
        top:0,
        left:0,
        width: '100%',
        margin: theme.spacing(0),
        padding: theme.spacing(0)
    },

    box: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        width: '100%',
        height: headerHeight,
        border: '0px',
        color: theme.palette.primary.main,
        fontFamily: theme.typography.h6.fontFamily,
        fontSize: theme.typography.h6.fontSize,
    },

    body: {
        padding: theme.spacing(0),
        height: '100vh',
        border: '0px',
        color: theme.palette.primary.main,
        backgroundColor: 'green',
        fontFamily: theme.typography.h6.fontFamily,
        fontSize: theme.typography.h6.fontSize,
    },

    logo: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: theme.palette.info.contrastText,
        fontFamily: theme.typography.button.fontFamily,
        fontSize: theme.typography.button.fontSize
    },

    menubutton: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: theme.palette.info.contrastText,
        fontFamily: theme.typography.button.fontFamily,
        fontSize: theme.typography.button.fontSize
    }
}));