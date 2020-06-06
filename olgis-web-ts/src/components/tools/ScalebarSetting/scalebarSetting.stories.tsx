import {storiesOf} from "@storybook/react";
import ScalebarSetting from "./scalebarSetting";
import React, {useState} from "react";
import {Box} from "@material-ui/core";
import ToolDialog from "../toolDialog";
import {showWithMap} from "../../../stories";
import ScalebarSettingDialog from "./scalebarSettingDialog";

const defaultScalebarSetting = () => (
    <div style={{margin: 10, padding: 10}}>
        <ScalebarSetting
            open={true}
        />
    </div>
);

storiesOf("比例尺设置", module)
    .add("比例尺配置组件", defaultScalebarSetting)
    .add("比例尺配置对话框", showWithMap(<ScalebarSettingDialog/>));