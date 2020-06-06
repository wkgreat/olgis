import IconButton from "@material-ui/core/IconButton";
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import React from "react";
import {MapContext} from "../MapContext/mapContext";
import LayerInfoProps from "./layerInfoProps";
import {LayerUtils} from "../../olmap";

export interface LayerDownButtonProps extends LayerInfoProps{
}

/**
 * @param layerName 图层名称
 * */
const LayerDownButton:React.FC<LayerDownButtonProps> = (props) => {

    const {layerName} = props;

    const olmap = React.useContext(MapContext);

    const handleClick = () => {
        if(olmap && layerName) {
            LayerUtils.layerDown(olmap,layerName);
        }
    };

    return (
        <IconButton edge="end" aria-label="comments" size="small" onClick={handleClick}>
            <ArrowDownward fontSize="small"/>
        </IconButton>
    )

}

export default LayerDownButton;