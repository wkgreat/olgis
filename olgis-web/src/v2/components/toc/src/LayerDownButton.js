import IconButton from "@material-ui/core/IconButton";
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import React from "react";
import {MapContext} from "../../mapContext";
import * as LAYERS from "../../../../olmap/olmapLayer";


/**
 * @param layerName 图层名称
 * */
const LayerDownButton = (props) => {

    const olmap = React.useContext(MapContext);

    const handleClick = () => {
        LAYERS.layerDown(olmap,props.layerName);
    };

    return (
        <IconButton edge="end" aria-label="comments" size="small" onClick={handleClick}>
            <ArrowDownward fontSize="small"/>
        </IconButton>
    )

}

export default LayerDownButton;