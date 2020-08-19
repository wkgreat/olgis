import {storiesOf} from "@storybook/react";
import StatusBar from "./statusBar";
import React from "react";
import MousePosition from "./mousePosition";
import {showWithMap} from "../../stories";
import ProjectionStatus from "./projectionStatus";

storiesOf("地图状态组件", module)
.add("状态栏", showWithMap(
    <StatusBar visible={true}>
        <MousePosition visible={true} followMouse={false}/>
        <ProjectionStatus visible={true}/>
    </StatusBar>
))
.add("鼠标位置状态组件-跟随鼠标", showWithMap(
    <MousePosition visible={true} followMouse={true}/>
));
