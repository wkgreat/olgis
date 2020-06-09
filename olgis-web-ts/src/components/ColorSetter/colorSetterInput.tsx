import React, {ChangeEvent, FC, useState} from "react";
import {decomposeColor, hexToRgb, InputAdornment, TextField} from "@material-ui/core";
import ColorSetterButton from "./colorSetterButton";
import {ColorResult} from "react-color";
import {rgbArrayToColorObject, rgbObjectToArray} from "./color";

interface ColorSetterInputProps {
    id ?: string
    label ?: string
    color ?: string | number[],
    onColorChange ?: (color: number[]) => void
}

const ColorSetterInput: FC<ColorSetterInputProps> = (props) => {

    const getInputColor = (color: string | number[] | undefined): number[] => {
        if(!color) color = '#ffffff';
        if(typeof color === 'string') {
            return decomposeColor(hexToRgb(color)).values;
        } else {
            return color as number[];
        }
    };

    const [color, setColor] = useState<number[]>(getInputColor(props.color));

    const onColorChange = (color: ColorResult, event:ChangeEvent<HTMLInputElement>) => {
        let theColor = rgbObjectToArray(color.rgb);
        setColor(theColor);
        props.onColorChange && props.onColorChange(theColor);
    };

    return (
        <TextField
            id={props.id}
            label={props.label}
            value={color}
            style={{
                backgroundColor: `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <ColorSetterButton
                            color={rgbArrayToColorObject(color)}
                            onChange={onColorChange}
                            iconButtonProps={{
                                size: "small"
                            }}
                        />
                    </InputAdornment>
                ),
            }}
        />
    );

};

ColorSetterInput.defaultProps = {
    id: "color-setting-text-field",
    label: 'Color Setting',
    color: '#ffffff'
};

export default ColorSetterInput;