import React, {FC} from 'react';
import {ColorChangeHandler, CompactPicker} from 'react-color';
import {Button} from "@material-ui/core";

export interface ColorChooserProps {
    visible ?: boolean;
    onColorChange ?: ColorChangeHandler
    onOK ?: ((event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void) | undefined
}

const ColorChooser: FC<ColorChooserProps> = (props) => {
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