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
        width: 12

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
        width: 12
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
    },

    panelContentOpen: {
        visibility: "visible"
    },
    panelContentClose: {
        visibility: "hidden"
    }

}));
