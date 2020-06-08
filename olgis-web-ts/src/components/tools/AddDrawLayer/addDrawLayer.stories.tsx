import {storiesOf} from "@storybook/react";
import {showWithMap} from "../../../stories";
import AddDrawLayerToolDrawer from "./addDrawLayerToolDrawer";
import React from "react";

storiesOf("图层绘制工具", module)
    .add("图层绘制", showWithMap(<AddDrawLayerToolDrawer open={true} />));