import {
    ExpansionPanel as MuiExpansionPanel,
    ExpansionPanelDetails as MuiExpansionPanelDetails,
    ExpansionPanelSummary as MuiExpansionPanelSummary,
    ListItem,
    styled,
    withStyles
} from "@material-ui/core";
import * as React from "react";

export const minWidth = 240;

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

export const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .1)',
        borderBottom: '1px solid rgba(1, 1, 1, .5)',
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: 0
        },
    },
    expanded: {}
})(MuiExpansionPanelSummary);

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