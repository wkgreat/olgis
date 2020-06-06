import React from "react";
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Map from "./map";
import MapContextProvider from "../MapContext/mapContext";
import {View} from "ol";
import {fromLonLat} from "ol/proj";
import TileLayer from "ol/layer/Tile";
import {OSM, XYZ} from "ol/source";
import {LayerUtils} from "../../olmap";

const defaultMap = () => (
    <Map/>
);


storiesOf('地图组件', module)
    .add('Map', defaultMap)
