import {storiesOf} from "@storybook/react";
import Panel from "./panel";
import React from "react";
import Map from "../Map/map";

storiesOf("左侧功能栏", module)
.add("左侧功能栏", ()=>(
    <>
        <Map/>
        <Panel open={true}/>
    </>
))