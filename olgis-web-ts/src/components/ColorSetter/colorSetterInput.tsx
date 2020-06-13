import React, {ChangeEvent, FC, useState} from "react";
import {decomposeColor, hexToRgb, InputAdornment, Paper, TextField} from "@material-ui/core";
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

    const showColor = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;

    return (
        <TextField
            id={props.id}
            label={props.label}
            value={color}
            margin="dense"
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="end">
                        <ColorSetterButton
                            color={rgbArrayToColorObject(color)}
                            onChange={onColorChange}
                            iconButtonProps={{
                                size: "small",
                                style: {
                                    position: "absolute",
                                    right: 10,
                                    bottom: 1
                                }
                            }}
                        />
                    </InputAdornment>
                ),
                style : {
                    borderLeft: '5px solid #000',
                    borderColor: showColor
                }
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