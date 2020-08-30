import React from "react";
import {storiesOf} from '@storybook/react'
import Map from "./map";

const defaultMap = () => (
    <Map/>
);


storiesOf('地图组件', module)
    .add('Map', defaultMap)
