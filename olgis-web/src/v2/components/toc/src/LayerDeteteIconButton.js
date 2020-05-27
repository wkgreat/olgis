import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import {MapContext} from "../../mapContext";
import * as LAYERS from "../../../../olmap/olmapLayer";


/**
 * @param layerName 图层名称
 * */
const LayerDeleteIconButton = (props) => {

    const olmap = React.useContext(MapContext);

    const handleClick = () => {
        LAYERS.removeLayerByName(olmap, props.layerName);
    };

    return (
        <IconButton edge="end" aria-label="comments" size="small" onClick={handleClick}>
            <DeleteIcon fontSize="small"/>
        </IconButton>
    )

}

export default LayerDeleteIconButton;