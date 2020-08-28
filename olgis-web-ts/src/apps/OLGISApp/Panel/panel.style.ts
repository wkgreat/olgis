import {makeStyles, Theme} from "@material-ui/core/styles";

interface StyleProps {
    width ?: number
}

export const panelStyle = makeStyles<Theme,StyleProps>((theme)=>({

    drawer: {
        width: props => props.width || 240,
        flexShrink: 0,
    },

    paperOpen: {
        width: props => props.width || 240,
        transition: theme.transitions.create(['width','height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        opacity: 0.95,
        overflowX: 'hidden',
    },
    paperClose: {
        width: 0,
        transition: theme.transitions.create(['width','height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        overflowY: 'hidden'
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

    collapse: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
    }

}));
