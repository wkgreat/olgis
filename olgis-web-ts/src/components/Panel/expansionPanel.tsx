import {
    ExpansionPanel as MuiExpansionPanel,
    ExpansionPanelDetails as MuiExpansionPanelDetails,
    ExpansionPanelSummary as MuiExpansionPanelSummary,
    ListItem,
    styled,
    withStyles
} from "@material-ui/core";

export const minWidth = 240;

/**
 * 扩展列表
 * */
export const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 0
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const panelHeaderHeight = 36;

/**
 * 扩展列表标题
 * */
export const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .1)',
        borderBottom: '1px solid rgba(1, 1, 1, .5)',
        height: panelHeaderHeight,
        minHeight: panelHeaderHeight,
        '&$expanded': {
            minHeight: panelHeaderHeight
        },
    },
    content: {
        '&$expanded': {
            margin: 0
        },
    },
    expanded: {}
})(MuiExpansionPanelSummary);

/**
 * 扩展列表内容
 * */
export const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        minWidth: 240,
        padding: 0,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
}))(MuiExpansionPanelDetails);

export const ListItemButton = styled(ListItem)({
    borderWidth: 1,
    color: 'white',
    height: 20,
    width: 240
});
