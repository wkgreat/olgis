import {addDecorator, addParameters, configure} from '@storybook/react'

import * as React from "react";
import {withInfo} from "@storybook/addon-info";
import MapContextProvider from "../src/components/MapContext/mapContext";
import {View} from "ol";
import {fromLonLat} from "ol/proj";
import TileLayer from "ol/layer/Tile";
import {OSM, XYZ} from "ol/source";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme, CssBaseline} from "@material-ui/core";

configure(require.context('../src', true, /\.stories\.tsx$/), module)

//addDecorator(withInfo)

const wrapperStyle: React.CSSProperties = {
    padding:0
};

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const view = new View({
    center: fromLonLat([118.794315, 32.050167]),
    zoom: 10
});

const layer1 = new TileLayer({source: new OSM()});
layer1.set("name", "osm");
const layer2 = new TileLayer({source: new XYZ({url:
            "http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png"
    })});
layer2.set("name", "terrain");

const layers = [
    layer1,
    layer2
];
const storyWrapper = (storyFn: any) => (
    <div style={wrapperStyle}>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <MapContextProvider view={view} layers={layers}>
                {storyFn()}
            </MapContextProvider>
        </ThemeProvider>
    </div>
)
addDecorator(storyWrapper)