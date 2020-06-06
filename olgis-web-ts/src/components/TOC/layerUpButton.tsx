import IconButton from "@material-ui/core/IconButton";
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import React from "react";
import LayerInfoProps from "./layerInfoProps";
import {MapContext} from "../MapContext/mapContext";
import {LayerUtils} from "../../olmap";

interface LayerUpButtonProps extends LayerInfoProps{

}

/**
 * @param props
 * */
const LayerUpButton = (props: LayerUpButtonProps) => {

    const {layerName} = props;

    const olmap = React.useContext(MapContext);

    const handleClick = () => {
        if(olmap && layerName) {
            LayerUtils.layerUp(olmap, layerName);
        }
    };

    return (
        <IconButton edge="end" aria-label="comments" size="small" onClick={handleClick}>
            <ArrowUpward fontSize="small"/>
        </IconButton>
    )

};

export default LayerUpButton;