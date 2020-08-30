import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {MapContext} from "../MapContext/mapContext";
import LayerInfoProps from "./layerInfoProps";
import {LayerUtils} from "../../olmap";

interface LayerDeleteIconButtonProps extends LayerInfoProps{
}

/**
 * @param layerName 图层名称
 * */
const LayerDeleteIconButton: React.FC<LayerDeleteIconButtonProps> = (props) => {

    const {layerName} = props;

    const olmap = React.useContext(MapContext);

    const handleClick = () => {
        if(olmap && layerName)
        LayerUtils.removeLayerByName(olmap, layerName);
    };

    return (
        <IconButton edge="end" aria-label="comments" size="small" onClick={handleClick}>
            <DeleteIcon fontSize="small"/>
        </IconButton>
    )

}

export default LayerDeleteIconButton;