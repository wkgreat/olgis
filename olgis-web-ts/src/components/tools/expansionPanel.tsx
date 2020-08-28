import {ExpansionPanelDetails as MuiExpansionPanelDetails, ListItem, styled, withStyles} from "@material-ui/core";

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
