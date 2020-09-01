import React, {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import {Box, BoxProps, Button, ButtonGroup, Divider, InputLabel, PropTypes, Switch} from "@material-ui/core";
import BaseToolProps from "../baseToolProps";
import TextField from "@material-ui/core/TextField/TextField";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw";
import {MapContext} from "../../MapContext/mapContext";
import {genLayerName} from "../../../olmap/olmapLayer";
import {LayerUtils, StyleUtils} from "../../../olmap";
import GeometryType from "ol/geom/GeometryType";
import ToolTitle from "../../common/toolTitle";


interface AddDrawLayerProps extends BaseToolProps{
    boxProps?: BoxProps
}

//TODO useRef
let source: VectorSource | undefined = undefined;
let layer: VectorLayer | undefined = undefined;
let drawInteraction: Draw | undefined = undefined;

const AddDrawLayer:FC<AddDrawLayerProps> = (props) => {

    const olmap = useContext(MapContext);

    const [layerName, setLayerName] = useState("ol-draw-layer");
    const [layerType, setLayerType] = useState<GeometryType>(GeometryType.POINT);
    const [freehand, setFreehand] = useState(false);

    useEffect(()=>{

        if(props.open) {
            source = new VectorSource();
            layer = new VectorLayer({
                source: source,
                style: StyleUtils.getDefaultStyle()
            });
            layer.set('name', genLayerName(olmap, layerName));
            LayerUtils.addLayer(olmap, layer);

            drawInteraction = new Draw({
                source: source,
                type: layerType,
                freehand
            });
            olmap.addInteraction(drawInteraction);
        }

    }, [props.open, props.signal]);



    const onLayerNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        LayerUtils.renameLayer(olmap, layerName, event.target.value);
        setLayerName(event.target.value);
    };

    const onLayerTypeChange = (type: GeometryType) => {
        drawInteraction && olmap.removeInteraction(drawInteraction);
        drawInteraction = new Draw({
            source: source,
            type: type,
            freehand
        });
        olmap.addInteraction(drawInteraction);
        setLayerType(type);
    };

    const disableFreehand = ():boolean => {
        if(layerType===GeometryType.LINE_STRING
            || layerType===GeometryType.MULTI_LINE_STRING
            || layerType===GeometryType.POLYGON
            || layerType===GeometryType.MULTI_POLYGON
        ) {
            return false;
        }
        return true;
    };

    const onFreeHandChange = (e:any,v:boolean) => {
        drawInteraction && olmap.removeInteraction(drawInteraction);
        drawInteraction = new Draw({
            source: source,
            type: layerType,
            freehand: v
        });
        olmap.addInteraction(drawInteraction);
        setFreehand(v);
    };

    const getButtonType = (theType: GeometryType, layerType: GeometryType): 'text' | 'outlined' | 'contained' => {
        return layerType===theType ? "contained" : "outlined"
    };

    const getButtonColor = (theType: GeometryType, layerType: GeometryType): PropTypes.Color => {
        return layerType===theType ? "primary" : "default"
    };

    const onOK = () => {
        drawInteraction && olmap.removeInteraction(drawInteraction);
        source = undefined;
        layer = undefined;
        drawInteraction = undefined;
        props.onOK && props.onOK();
    };

    const onCancel = () => {
        if(olmap && drawInteraction) olmap.removeInteraction(drawInteraction);
        if(layer) LayerUtils.removeLayerByName(olmap, layer.get('name'));
        source = undefined;
        layer = undefined;
        drawInteraction = undefined;
        if(props.onCancel) props.onCancel();
    };


    if(props.open) {
        return (
            <Box {...props.boxProps}>
                <ToolTitle title={props.title || "绘制图层"}
                           showOK={Boolean(props.enableOK)} showCancel={Boolean(props.enableCancel)}
                           onOK={onOK} onCancel={onCancel}
                />
                <Divider/>
                <Box py={1}>
                    <TextField id="standard-basic" label="图层名称" margin="normal" fullWidth={true}
                               value={layerName} onChange={onLayerNameChange}
                    />
                </Box>
                <Box py={1} display="flex" alignItems="center">
                    <Box flexGrow={1}><InputLabel shrink={true}>要素类型</InputLabel></Box>
                    <Box>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button
                                size="small"
                                variant={getButtonType(GeometryType.POINT, layerType)}
                                color={getButtonColor(GeometryType.POINT, layerType)}
                                onClick={()=>{onLayerTypeChange(GeometryType.POINT)}}
                            >Point</Button>
                            <Button
                                size="small"
                                variant={getButtonType(GeometryType.LINE_STRING, layerType)}
                                color={getButtonColor(GeometryType.LINE_STRING, layerType)}
                                onClick={()=>{onLayerTypeChange(GeometryType.LINE_STRING)}}
                            >LineString</Button>
                            <Button
                                size="small"
                                variant={getButtonType(GeometryType.POLYGON, layerType)}
                                color={getButtonColor(GeometryType.POLYGON, layerType)}
                                onClick={()=>{onLayerTypeChange(GeometryType.POLYGON)}}
                            >Polygon</Button>
                            <Button
                                size="small"
                                variant={getButtonType(GeometryType.CIRCLE, layerType)}
                                color={getButtonColor(GeometryType.CIRCLE, layerType)}
                                onClick={()=>{onLayerTypeChange(GeometryType.CIRCLE)}}
                            >Circle</Button>
                        </ButtonGroup>
                    </Box>
                </Box>

                <Box py={1} display="flex" alignItems="center">
                    <Box flexGrow={1}><InputLabel shrink={true}>是否徒手画<br/>(在Polyline和Polygon模式下可选,同时按住SHIFT键也为该模式)</InputLabel></Box>
                    <Box><Switch size="small" disabled={disableFreehand()} checked={freehand} onChange={onFreeHandChange}/></Box>
                </Box>
            </Box>
        );
    } else {
        return <></>;
    }


};

export default AddDrawLayer;
