import BaseLayer, {Options as BaseLayerOptions} from "ol/layer/Base";
import React, {FC, useContext, useState} from "react";
import {PaperProps} from "@material-ui/core";
import {LayerUtils} from "../../olmap";
import {MapContext} from "../MapContext/mapContext";
import LabeledSwitch from "../common/labeledSwitch";
import Box from "@material-ui/core/Box";
import TextField from "../common/textField";

/**
 *     opacity?: number;
 visible?: boolean;
 extent?: Extent;
 zIndex?: number;
 minResolution?: number;
 maxResolution?: number;
 minZoom?: number;
 maxZoom?: number;
 * */

interface LayerBasePropsSettingProps {
    open ?: boolean
    title ?: string
    paperProps ?: PaperProps
    layer ?: BaseLayer | BaseLayerOptions
    onChange ?: (opts:BaseLayerOptions) => void
    isLayerChange ?: boolean
}

const getOptions = (layer ?: BaseLayer | BaseLayerOptions): BaseLayerOptions => {
    if(!layer) {
        return {};
    } else if (layer instanceof BaseLayer) {
        return Object.assign({}, LayerUtils.getOptionsFromBaseLayer(layer));
    } else {
        return Object.assign({}, layer);
    }
};

const LayerBasePropsSetting: FC<LayerBasePropsSettingProps> = ({open, layer, onChange, title, paperProps, isLayerChange}) => {

    const olmap = useContext(MapContext);

    const [options, setOptions] = useState(getOptions(layer));

    const setOp = (opt: Partial<BaseLayerOptions>): void => {
        let newOpts = Object.assign(options, opt);
        setOptions({...newOpts});
        onChange && onChange(newOpts);
        if(isLayerChange && layer instanceof BaseLayer) {
            LayerUtils.setBaseLayerFromOptions(layer, newOpts, olmap);
        }
    };

    if(open && layer) {
        return (
            <Box boxShadow={5} display="flex" p={1} m={1} flexWrap="wrap">
                <LabeledSwitch label="Visible" checked={options.visible} onChange={(e, v)=>setOp({visible: v})}/>
                <TextField id="baselayer-opacity" label="Opacity" type="number" inputProps={{min:0, step:0.01, max:1}}
                           value={options.opacity} onChange={(e)=>setOp({opacity:Number(e.target.value)})}
                           size="small"
                />
                <TextField id="baselayer-zIndex" label="zIndex" type="number" inputProps={{min:-10, step:1, max:10000}}
                           value={options.zIndex} onChange={(e)=>setOp({zIndex:Number(e.target.value)})}
                           size="small"
                />
                <TextField id="baselayer-minResolution" label="minResolution" type="number" inputProps={{min:-10, step:0.01, max:10}}
                           value={options.minResolution} onChange={(e)=>setOp({minResolution:Number(e.target.value)})}
                           size="small"
                />
                <TextField id="baselayer-maxResolution" label="maxResolution" type="number" inputProps={{min:-10, step:0.01, max:10}}
                           value={options.maxResolution} onChange={(e)=>setOp({maxResolution:Number(e.target.value)})}
                           size="small"
                />
                <TextField id="baselayer-minZoom" label="minZoom" type="number" inputProps={{min:0, step:1, max:20}}
                           value={options.minZoom} onChange={(e)=>setOp({minZoom:Number(e.target.value)})}
                           size="small"
                />
                <TextField id="baselayer-maxZoom" label="maxZoom" type="number" inputProps={{min:0, step:1, max:20}}
                           value={options.maxZoom} onChange={(e)=>setOp({maxZoom:Number(e.target.value)})}
                           size="small"
                />
            </Box>
        );
    } else {
        return <></>
    }

};

LayerBasePropsSetting.defaultProps = {
    isLayerChange: true
};

export default LayerBasePropsSetting;
