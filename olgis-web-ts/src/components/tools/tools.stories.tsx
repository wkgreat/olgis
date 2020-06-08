import {storiesOf} from "@storybook/react";
import AddXYZTileLayerTool from "./AddXYZTileLayer/addXYZTileLayerTool";
import React from "react";
import AddGeohashFishnet from "./AddGeohashFishnet/addGeohashFishnet";
import AddMapboxVectorTileLayer from "./AddMapboxVectorTileLayer/addMapboxVectorTileLayer";
import {showWithMap} from "../../stories";

storiesOf("工具",module)
    .add("添加XYZ图层工具", showWithMap(<AddXYZTileLayerTool open={true}/>))
    .add("添加GeoHash图层工具", showWithMap(<AddGeohashFishnet open={true}/>))
    .add("添加XYZ矢量瓦片图层工具", showWithMap(<AddXYZTileLayerTool open={true}/>))
    .add("添加Mapbox矢量瓦片图层工具", showWithMap(<AddMapboxVectorTileLayer open={true}/>));