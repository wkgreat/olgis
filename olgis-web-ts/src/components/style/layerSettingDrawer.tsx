import BaseToolProps, {ToolCallback} from "../tools/baseToolProps";
import React, {FC, useEffect, useState} from "react";
import ToolDrawer from "../tools/toolDrawer";
import VectorStyleSetting from "./vectorStyleSetting";
import BaseLayer from "ol/layer/Base";
import BaseVectorLayer from "ol/layer/BaseVector";
import BaseTileLayer from "ol/layer/BaseTile";
import RasterLayerSetting from "./rasterLayerSetting";

export interface VectorStyleSettingDrawerProps extends BaseToolProps {
    layer ?: BaseLayer
}

/**
 * TODO justify layer type (vector layer ? raster layer)
 * */
const getStyleSettingByType = (layer: BaseLayer, onOK: ToolCallback, onCancel: ToolCallback) => {
    if(layer instanceof BaseVectorLayer) {
        return (
            <VectorStyleSetting open={true} layer={layer as BaseVectorLayer} onOK={onOK} onCancel={onCancel}/>
        );
    } else if (layer instanceof BaseTileLayer){
        //TODO
        return (

            <RasterLayerSetting open={true} layer={layer} onOK={onOK}/>

        );
    } else {
        console.warn("getStyleSettingByType MISS TYPE")
    }
};

const LayerSettingDrawer: FC<VectorStyleSettingDrawerProps> = (props) => {

    const {layer} = props;

    const [isOpen, setIsOpen] = useState(Boolean(props.open));

    useEffect(()=>{
        setIsOpen(Boolean(props.open));
    }, [props.open, props.signal]);

    const onOK = (event: any) => {
        setIsOpen(false);
    };
    const onCancel = (evnet: any) => {
        setIsOpen(false);
    };

    if(isOpen && layer) {
        return (
            <ToolDrawer
                variant="permanent"
                anchor="right"
                PaperProps={{
                    elevation: 10,
                    style: {
                        maxWidth: 540,
                        opacity: 0.95
                    }
                }}
            >
                {getStyleSettingByType(layer, onOK, onCancel)}
            </ToolDrawer>
        );
    } else {
        return <></>;
    }

};

export default LayerSettingDrawer;