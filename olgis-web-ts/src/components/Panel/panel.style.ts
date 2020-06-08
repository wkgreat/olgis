import {makeStyles} from "@material-ui/core/styles";

export const defaultMinWidth = 240;

export const panelStyle = makeStyles((theme)=>({

    panelOpen: {
        width: defaultMinWidth,
        transition: theme.transitions.create(['width','height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    },
    panelClose: {
        transition: theme.transitions.create(['width','height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        overflowY: 'hidden',
        width: 56,
        height: 56,
        backgroundColor: "rgba(0,0,0,0)"

    },
    paperOpen: {
        width: defaultMinWidth,
        transition: theme.transitions.create(['width','height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        opacity: 0.95,
        overflowX: 'hidden',
    },
    paperClose: {
        transition: theme.transitions.create(['width','height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        overflowY: 'hidden',
        width: 56,
        height: 56,
        opacity: 0.95,
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    panelHeader: {
        height: 56,
        flex: '0 0 auto',
        position: 'relative',
        padding: 16
    },
    toggleButton : {
        position: 'absolute',
        top: 14,
        right: 14
    }

}));