import React, {useContext, useState} from "react";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {MapContext} from "../../mapContext";
import * as LAYERS from "../../../../olmap/olmapLayer";

/**
 * @param layerName 图层名称
 * */
const LayerVisibleCheckBox = (props) => {

    const olmap = useContext(MapContext);
    const layerName = props.layerName;
    let theLayer = LAYERS.findLayerByName(olmap, layerName);

    const [checked, setChecked] = useState(theLayer && theLayer.getVisible());

    const handleChecked = (e,c) => {
        setChecked(c);
        if(theLayer) {
            theLayer.setVisible(c);
        }
    };

    return (
        <Checkbox
            size="small"
            edge="start"
            checked={checked}
            onChange={handleChecked}
            tabIndex={-1}
            disableRipple
        />
    );


};

export default LayerVisibleCheckBox;