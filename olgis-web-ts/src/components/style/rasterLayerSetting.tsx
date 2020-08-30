import BaseToolProps, {ToolCallback} from "../tools/baseToolProps";
import React, {FC} from "react";
import {Box, Typography} from "@material-ui/core";
import LayerBasePropsSetting from "./layerBasePropsSetting";
import ToolTitle from "../common/toolTitle";
import BaseTileLayer from "ol/layer/BaseTile";

interface BasicRasterLayerSettingProps {
    layer ?: BaseTileLayer;
}

export type RasterLayerSettingProps = BasicRasterLayerSettingProps & BaseToolProps

const RasterLayerSetting: FC<RasterLayerSettingProps> = (props) => {

    const {layer} = props;

    const onOK = (event: ToolCallback)=> {
        props.onOK && props.onOK(event)
    };

    const onCancel = (event: ToolCallback)=> {
        props.onCancel && props.onCancel(event)
    };

    if(props.open) {
        if(!layer) {
            return <div>The Layer Can not find!</div>;
        } else {
            return (
                <Box m={1} p={1}>
                    <ToolTitle title={`栅格图层设置[${layer.get('name')}]`}
                               onOK={onOK} onCancel={onCancel} showCancel={false}
                    />
                    <Box><Typography variant="subtitle1" color="primary">图层属性</Typography></Box>
                    <LayerBasePropsSetting open={true} layer={layer} isLayerChange={true} paperProps={{elevation:2}}/>
                </Box>
            );
        }

    } else {
        return <></>
    }

};

export default RasterLayerSetting;