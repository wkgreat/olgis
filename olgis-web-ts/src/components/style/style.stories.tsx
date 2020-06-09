import {storiesOf} from "@storybook/react";
import React from "react";
import FillSetting from "./fillSetting";

storiesOf("Map Style", module)
.add("fill style", ()=>(
    <FillSetting open={true} onChange={(options) => {
    console.log(options)
}}/>
));