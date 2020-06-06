import * as React from "react";
import {ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, styled} from "@material-ui/core";
import LayerVisibleCheckBox from "./layerVisibleCheckBox";
import LayerInfoProps from "./layerInfoProps";
import LayerUpButton from "./layerUpButton";
import LayerDownButton from "./layerDownButton";
import LayerDeleteIconButton from "./layerDeteteIconButton";

interface LayerItemProps extends LayerInfoProps{
    key: number
}

const LayerItem: React.FC<LayerItemProps> = (props) => {

    const labelId = `layerItem-${props.layerName}`;

    return (

        <ListItemButton key={props.layerName} role={undefined} dense button>
            <ListItemIcon style={{padding:0, margin:0, minWidth: 0}}>
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

export default LayerItem;