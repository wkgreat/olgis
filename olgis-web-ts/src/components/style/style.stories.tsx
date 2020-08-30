import {storiesOf} from "@storybook/react";
import React from "react";
import FillSetting from "./fillSetting";
import StrokeSetting from "./strokeSetting";
import RegularShapeSetting from "./regularShapeSetting";
import VectorStyleSetting from "./vectorStyleSetting";
import VectorLayer from "ol/layer/Vector";
import LayerBasePropsSetting from "./layerBasePropsSetting";

storiesOf("图层样式", module)
    .add("FillSetting", ()=>(
        <FillSetting open={true} onChange={(options) => {
            console.log(options)
        }}/>
    ))
    .add("StrokeSetting", ()=>(
        <StrokeSetting open={true} onChange={(options) => {
            console.log(options)
        }}/>
    ))
    .add("RegularShapeSetting", ()=>(
        <RegularShapeSetting open={true} onChange={(options) => {
            console.log(options)
        }}/>
    ))
    .add("VectorStyleSetting", ()=>(
        <VectorStyleSetting open={true} layer={new VectorLayer()}/>
    ))
    .add("BaseLayerSetting", ()=>(
        <LayerBasePropsSetting open={true} layer={new VectorLayer()}/>
    ));