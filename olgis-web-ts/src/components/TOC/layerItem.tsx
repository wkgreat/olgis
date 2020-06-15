import * as React from "react";
import {ListItemIcon, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import LayerVisibleCheckBox from "./layerVisibleCheckBox";
import LayerInfoProps from "./layerInfoProps";
import LayerUpButton from "./layerUpButton";
import LayerDownButton from "./layerDownButton";
import LayerDeleteIconButton from "./layerDeteteIconButton";
import {ListItemButton} from "../Panel/expansionPanel";
import {useContext} from "react";
import {MapContext} from "../MapContext/mapContext";
import LayerSettingButton from "./layerSettingButton";

interface LayerItemProps extends LayerInfoProps{
    key: number
}

const LayerItem: React.FC<LayerItemProps> = (props) => {

    const {layerName} = props;

    const labelId = `layerItem-${layerName}`;

    return (

        <ListItemButton key={props.layerName} role={undefined} dense button>
            <ListItemIcon style={{padding:0, margin:0, minWidth: 0}}>
                <LayerVisibleCheckBox layerName={props.layerName}/>
            </ListItemIcon>

            <ListItemText id={labelId}>
                {layerName}
            </ListItemText>
            <ListItemSecondaryAction>
                <LayerUpButton layerName={layerName}/>
                <LayerDownButton layerName={layerName}/>
                <LayerDeleteIconButton layerName={layerName}/>
                <LayerSettingButton layerName={layerName}/>
            </ListItemSecondaryAction>

        </ListItemButton>

    );

};

export default LayerItem;