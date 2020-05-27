import IconButton from "@material-ui/core/IconButton";
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import React from "react";
import {MapContext} from "../../mapContext";
import * as LAYERS from "../../../../olmap/olmapLayer";


/**
 * @param layerName 图层名称
 * */
const LayerUpButton = (props) => {

    const olmap = React.useContext(MapContext);

    const handleClick = () => {
        LAYERS.layerUp(olmap,props.layerName);
    };

    return (
        <IconButton edge="end" aria-label="comments" size="small" onClick={handleClick}>
            <ArrowUpward fontSize="small"/>
        </IconButton>
    )

};

export default LayerUpButton;