import React, {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import {Box, BoxProps, Button, ButtonGroup, Grid, PropTypes} from "@material-ui/core";
import BaseToolProps from "../baseToolProps";
import {rowConfig, showButton, showTitle} from "../toolDialog";
import TextField from "@material-ui/core/TextField/TextField";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw";
import {MapContext} from "../../MapContext/mapContext";
import {genLayerName} from "../../../olmap/olmapLayer";
import {LayerUtils, StyleUtils} from "../../../olmap";
import GeometryType from "ol/geom/GeometryType";


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

    useEffect(()=>{

        source = new VectorSource();
        layer = new VectorLayer({
            source: source,
            style: StyleUtils.getDefaultStyle()
        });
        layer.set('name', genLayerName(olmap, layerName));
        LayerUtils.addLayer(olmap, layer);

        drawInteraction = new Draw({
            source: source,
            type: layerType
        });

        olmap.addInteraction(drawInteraction);

    }, []);



    const onLayerNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        LayerUtils.renameLayer(olmap, layerName, event.target.value);
        setLayerName(event.target.value);
    };

    const onLayerTypeChange = (type: GeometryType) => {
        drawInteraction && olmap.removeInteraction(drawInteraction);
        drawInteraction = new Draw({
            source: source,
            type: type
        });
        olmap.addInteraction(drawInteraction);
        setLayerType(type);
    };

    const getButtonColor = (theType: GeometryType, layerType: GeometryType): PropTypes.Color => {
        return layerType===theType ? "primary" : "default"
    };

    const onOK = () => {
        drawInteraction && olmap.removeInteraction(drawInteraction);
        props.onOK && props.onOK();
    };

    const onCancel = () => {
        if(olmap && drawInteraction) olmap.removeInteraction(drawInteraction);
        if(layer) LayerUtils.removeLayerByName(olmap, layer.get('name'));
        if(props.onCancel) props.onCancel();
    };


    if(props.open) {
        return (
            <Box {...props.boxProps}>
                {showTitle(props.title || "绘制图层")}
                <Grid container spacing={0} justify="flex-end" alignItems="center">
                    {rowConfig("图层名称:", 12 ,12, false)(
                        <TextField id="standard-basic" label="图层名称" margin="normal" fullWidth={true}
                                   value={layerName} onChange={onLayerNameChange}
                        />
                    )}
                    {rowConfig("要素类型:", 12 ,12, false)(
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button
                                size="small"
                                color={getButtonColor(GeometryType.POINT, layerType)}
                                onClick={()=>{onLayerTypeChange(GeometryType.POINT)}}
                            >Point</Button>
                            <Button
                                size="small"
                                color={getButtonColor(GeometryType.LINE_STRING, layerType)}
                                onClick={()=>{onLayerTypeChange(GeometryType.LINE_STRING)}}
                            >LineString</Button>
                            <Button
                                size="small"
                                color={getButtonColor(GeometryType.POLYGON, layerType)}
                                onClick={()=>{onLayerTypeChange(GeometryType.POLYGON)}}
                            >Polygon</Button>
                            <Button
                                size="small"
                                color={getButtonColor(GeometryType.CIRCLE, layerType)}
                                onClick={()=>{onLayerTypeChange(GeometryType.CIRCLE)}}
                            >Circle</Button>
                        </ButtonGroup>
                    )}
                </Grid>
                {showButton(Boolean(props.enableOK), onOK, Boolean(props.enableCancel), onCancel)}
            </Box>
        );
    } else {
        return <></>;
    }


};

export default AddDrawLayer;