import BaseToolProps from "../tools/baseToolProps";
import React, {FC, useEffect, useState} from "react";
import ToolDrawer from "../tools/toolDrawer";
import VectorStyleSetting from "./vectorStyleSetting";
import BaseLayer from "ol/layer/Base";
import BaseVectorLayer from "ol/layer/BaseVector";
import BaseTileLayer from "ol/layer/BaseTile";
import {Typography} from "@material-ui/core";
import LayerBasePropsSetting from "./layerBasePropsSetting";

export interface VectorStyleSettingDrawerProps extends BaseToolProps {
    layer ?: BaseLayer
}

/**
 * TODO justify layer type (vector layer ? raster layer)
 * */
const getStyleSettingByType = (layer: BaseLayer) => {
    if(layer instanceof BaseVectorLayer) {
        return <VectorStyleSetting open={true} layer={layer as BaseVectorLayer}/>;
    } else if (layer instanceof BaseTileLayer){
        //TODO
        return (

            <div style={{maxWidth: 680, minWidth: 320, margin: 10}}>
                <div><Typography variant="h6" color="secondary">图层属性</Typography></div>
                <LayerBasePropsSetting open={true} layer={layer} isLayerChange={true} paperProps={{elevation:2}}/>
            </div>

        );
    } else {
        console.warn("getStyleSettingByType MISS TYPE")
    }
};

const VectorStyleSettingDrawer: FC<VectorStyleSettingDrawerProps> = (props) => {

    const {layer} = props;

    const [isOpen, setIsOpen] = useState(Boolean(props.open));

    useEffect(()=>{
        setIsOpen(Boolean(props.open));
    }, [props.open, props.signal]);

    if(isOpen && layer) {
        return (
            <ToolDrawer
                variant="permanent"
                anchor="right"
                PaperProps={{
                    elevation: 10,
                    style: {
                        opacity: 0.95
                    }
                }}
            >
                {getStyleSettingByType(layer)}
            </ToolDrawer>
        );
    } else {
        return <></>;
    }

};

export default VectorStyleSettingDrawer;