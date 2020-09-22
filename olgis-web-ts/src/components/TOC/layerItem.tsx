import * as React from "react";
import {Box, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import LayerVisibleCheckBox from "./layerVisibleCheckBox";
import LayerInfoProps from "./layerInfoProps";
import LayerUpButton from "./layerUpButton";
import LayerDownButton from "./layerDownButton";
import LayerDeleteIconButton from "./layerDeteteIconButton";
import {ListItemButton} from "../tools/expansionPanel";
import LayerSettingButton from "./layerSettingButton";
import LayerContextMenu from "./layerContextMenu";

interface LayerItemProps extends LayerInfoProps{
    key: number
}

const LayerItem: React.FC<LayerItemProps> = (props) => {

    const {layerName} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const labelId = `layerItem-${layerName}`;

    const handleContextMenu = (event: any) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    return (

        <Box>
            <ListItemButton key={props.layerName} role={undefined} dense button
                            onContextMenu={handleContextMenu}
            >
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
            <LayerContextMenu
                layer={props.layer}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={(event:any)=>{setAnchorEl(null)}}
            />
        </Box>

    );

};

export default LayerItem;
