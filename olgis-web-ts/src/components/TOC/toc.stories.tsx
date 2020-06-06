import React from "react";
import {storiesOf} from '@storybook/react'
import TOC from "./toc";
import Map from "../Map/map";

const defaultMap = () => (
    <>
        <TOC open={true}/>
        <Map/>
    </>
);


storiesOf('TOC组件', module)
    .add('TOC', defaultMap);
