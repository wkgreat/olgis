import React, {ChangeEvent, FC, useContext, useEffect, useRef, useState} from "react";
import {Box, BoxProps, Button, ButtonGroup, Divider, InputLabel, PropTypes, Switch} from "@material-ui/core";
import BaseToolProps from "../baseToolProps";
import TextField from "@material-ui/core/TextField/TextField";
import Draw from "ol/interaction/Draw";
import {MapContext} from "../../MapContext/mapContext";
import {LayerUtils} from "../../../olmap";
import GeometryType from "ol/geom/GeometryType";
import ToolTitle from "../../common/toolTitle";
import {DrawLayer, makeDrawWithNewLayer} from "../../../olmap/interaction";


interface AddDrawLayerProps extends BaseToolProps{
    boxProps?: BoxProps
}

const AddDrawLayer:FC<AddDrawLayerProps> = (props) => {

    const olmap = useContext(MapContext);

    const [layerName, setLayerName] = useState("ol-draw-layer");
    const [layerType, setLayerType] = useState<GeometryType>(GeometryType.POINT);
    const [freehand, setFreehand] = useState(false);

    const drawInteration = useRef<DrawLayer|undefined>(undefined);

    useEffect(()=>{

        if(props.open) {
            const dl = drawInteration.current;
            if(dl) {
                olmap.removeInteraction(dl.draw)
            }
            drawInteration.current = makeDrawWithNewLayer(olmap,{
                type: layerType,
                freehand
            },layerName);
            olmap.addInteraction(drawInteration.current.draw);
            LayerUtils.addLayer(olmap, drawInteration.current.layer);

        }

    }, [props.open, props.signal]);



    const onLayerNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        LayerUtils.renameLayer(olmap, layerName, event.target.value);
        setLayerName(event.target.value);
    };

    const onLayerTypeChange = (type: GeometryType) => {
        const dl = drawInteration.current;
        if(dl) {
            olmap.removeInteraction(dl.draw);
            const newDraw = new Draw({
                type,
                freehand,
                source: dl.layer.getSource()
            });
            olmap.addInteraction(newDraw);
            drawInteration.current = {draw:newDraw, layer:dl.layer};
            setLayerType(type);
        }

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

    const onFreeHandChange = (e:any,freehand:boolean) => {
        const dl = drawInteration.current;
        if(dl) {
            olmap.removeInteraction(dl.draw);
            const newDraw = new Draw({
                type: layerType,
                freehand,
                source: dl.layer.getSource()
            });
            olmap.addInteraction(newDraw);
            drawInteration.current = {draw:newDraw, layer: dl.layer};
            setFreehand(freehand);
        }
    };

    const getButtonType = (theType: GeometryType, layerType: GeometryType): 'text' | 'outlined' | 'contained' => {
        return layerType===theType ? "contained" : "outlined"
    };

    const getButtonColor = (theType: GeometryType, layerType: GeometryType): PropTypes.Color => {
        return layerType===theType ? "primary" : "default"
    };

    const onOK = () => {
        const dl = drawInteration.current;
        if(dl) {
            const draw = dl.draw;
            draw && olmap.removeInteraction(draw);
        }

        props.onOK && props.onOK();
    };

    const onCancel = () => {
        const dl = drawInteration.current;
        if(dl) {
            const {draw, layer} = dl;
            if(olmap && draw) olmap.removeInteraction(draw);
            if(layer) LayerUtils.removeLayerByName(olmap, layer.get('name'));
        }

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
