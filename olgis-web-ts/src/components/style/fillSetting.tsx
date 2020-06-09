import React, {FC} from "react";
import {Fill} from "ol/style";
import {Options as FillOptions} from 'ol/style/Fill'
import {Box} from "@material-ui/core";
import {showTitle} from "../tools/toolDialog";
import {BasicStyleSettingProps} from "./basicStyleSetting";
import ColorSetterInput from "../ColorSetter/colorSetterInput";

export type FillSettingProps = BasicStyleSettingProps<Fill, FillOptions>;

const FillSetting: FC<FillSettingProps> = ({open, fillOrOptions, onChange, boxProps}) => {

    //TODO analyze the colorLike type
    const getColor = () => {
        let theColor;
        if(fillOrOptions instanceof Fill) {
            theColor = fillOrOptions.getColor();
        } else if (typeof fillOrOptions === 'object') {
            theColor = fillOrOptions.color;
        }
        if(theColor instanceof Array) {
            return theColor;
        } else {
            return '#ffffff';
        }
    };

    const onColorChange = (color: number[]) => {
        if(color && onChange) {
            onChange({color});
        };
    };

    if(open) {
        return (
            <Box {...boxProps}>
                {showTitle("Fill")}
                <ColorSetterInput label="color" color={getColor()} onColorChange={onColorChange}/>
            </Box>
        );
    } else {
        return <></>;
    }


};

export default FillSetting;