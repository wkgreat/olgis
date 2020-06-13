import BaseLayer, {Options as BaseLayerOptions} from "ol/layer/Base";
import React, {FC, useContext, useState} from "react";
import {Grid, Paper, PaperProps, Slider, Switch} from "@material-ui/core";
import {LayerUtils} from "../../olmap";
import {rowConfig, showTitle} from "../tools/toolDialog";
import {MapContext} from "../MapContext/mapContext";

interface LayerBasePropsSettingProps {
    open ?: boolean
    title ?: string
    paperProps ?: PaperProps
    layer ?: BaseLayer | BaseLayerOptions
    onChange ?: (opts:BaseLayerOptions) => void
    isLayerChange ?: boolean
}

const getOptions = (layer ?: BaseLayer | BaseLayerOptions) => {
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
            <Paper {...paperProps}>
                {title ? showTitle(title) : <></>}
                <Grid container spacing={4} alignItems="center">
                    <Grid xs="auto"/>
                    {rowConfig("Visible", 3, 3, false)(
                        <Switch checked={options.visible} onChange={(e,v)=>setOp({visible: v})}/>
                    )}
                    {rowConfig("Opacity", 3, 3, false)(
                        <Slider
                            track={false}
                            value={options.opacity}
                            valueLabelDisplay="auto"
                            min={0}
                            step={0.01}
                            max={1}
                            onChange={(e,v)=>setOp({opacity: v as number})}
                        />
                    )}
                </Grid>
            </Paper>
        );
    } else {
        return <></>
    }

};

LayerBasePropsSetting.defaultProps = {
    isLayerChange: true
};

export default LayerBasePropsSetting;