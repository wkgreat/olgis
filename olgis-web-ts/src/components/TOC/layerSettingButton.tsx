import Settings from '@material-ui/icons/Settings'
import React from "react";
import LayerInfoProps from "./layerInfoProps";
import {MapContext} from "../MapContext/mapContext";
import {LayerUtils} from "../../olmap";
import {IconButtonActivator} from "../tools/toolActivator";
import LayerSettingDrawer from "../style/layerSettingDrawer";

interface LayerStyleButtonProps extends LayerInfoProps{

}

/**
 * @param props
 * */
const LayerSettingButton = (props: LayerStyleButtonProps) => {

    const {layerName} = props;

    const olmap = React.useContext(MapContext);

    return (
        <IconButtonActivator
            label="图层设置"
            triggerProps={{edge:"end", size:"small"}}
            target={<LayerSettingDrawer layer={LayerUtils.findLayerByName(olmap, layerName || "")}/>}>
            <Settings fontSize="small"/>
        </IconButtonActivator>
    )

};

export default LayerSettingButton;