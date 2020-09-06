import React from "react";
import {styled} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import LayerVisibleCheckBox from "./LayerVisibleCheckBox";
import LayerDeleteIconButton from "./LayerDeteteIconButton";
import LayerUpButton from "./LayerUpButton";
import LayerDownButton from "./LayerDownButton";

/**
 *
 * @param key
 * @param layerName
 * @param layer
 *
 * */

export const LayerItem  = (props) => {

    const labelId = `layerItem-${props.layerName}`;

    return (

        <ListItemButton key={props.layerName} role={undefined} dense button>
            <ListItemIcon size="small" style={{padding:0, margin:0, minWidth: 0}}>
                <LayerVisibleCheckBox layerName={props.layerName}/>
            </ListItemIcon>

            <ListItemText id={labelId}>
                {props.layerName}
            </ListItemText>
            <ListItemSecondaryAction>
                <LayerUpButton layerName={props.layerName}/>
                <LayerDownButton layerName={props.layerName}/>
                <LayerDeleteIconButton layerName={props.layerName}/>
            </ListItemSecondaryAction>

        </ListItemButton>

    );

};

const ListItemButton = styled(ListItem)({
    borderWidth: 1,
    color: 'white',
    height: 20,
});

