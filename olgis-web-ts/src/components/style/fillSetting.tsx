import {BasicStyleSettingProps, getColor} from "./basicStyleSetting";
import Fill, {Options as FillOptions} from "ol/style/Fill";
import React, {FC} from "react";
import {Box} from "@material-ui/core";
import {showTitle} from "../tools/toolDialog";
import ColorSetterInput from "../ColorSetter/colorSetterInput";

export type FillSettingProps = BasicStyleSettingProps<Fill, FillOptions>;

const FillSetting: FC<FillSettingProps> = ({open, style, onChange, paperProps, title}) => {

    const onColorChange = (color: number[]) => {
        if(color && onChange) {
            onChange({color});
        };
    };

    if(open) {
        return (
            <Box boxShadow={5} display="flex" p={1} m={1}>
                {Boolean(title) ? showTitle(title as string) : null}
                <ColorSetterInput label="Fill Color" color={getColor(style)} onColorChange={onColorChange}/>
            </Box>
        );
    } else {
        return <></>;
    }


};

export default FillSetting;