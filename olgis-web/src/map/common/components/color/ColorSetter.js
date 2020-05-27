import React from "react";
import {Icon, Popover} from "antd";
import {SketchPicker} from 'react-color';

const ColorSetter = (props) => {

    const content = (
        <SketchPicker
            color={props.color}
            onChange={props.onChange}
            onOK={props.onOK}
            visible={true}
        />
    );

    return (
        <Popover content={content}>
            <Icon type="setting"/>
        </Popover>
    );

};

export default ColorSetter;