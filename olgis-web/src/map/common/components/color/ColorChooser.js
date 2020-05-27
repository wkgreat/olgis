import React from 'react';
import {Button} from 'antd';
import {CompactPicker} from 'react-color';

const ColorChooser = (props) => {
    if (props.visible) {
        return (
            <div>
                <CompactPicker onChange={props.onColorChange}/>
                <Button onClick={props.onOK}>确定</Button>
            </div>
        );
    } else {
        return <div style={{display: "none"}}/>;
    }
};

export default ColorChooser;