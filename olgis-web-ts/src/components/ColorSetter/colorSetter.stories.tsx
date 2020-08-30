import {storiesOf} from "@storybook/react";
import ColorSetterButton from "./colorSetterButton";
import React from "react";
import ColorSetterInput from "./colorSetterInput";

storiesOf("颜色设置组件", module)
.add("颜色设置按钮", ()=>(
    <ColorSetterButton/>
))
.add("颜色设置文本框", ()=>(
    <ColorSetterInput onColorChange={(color)=>{
        console.log(color);
    }}/>
));