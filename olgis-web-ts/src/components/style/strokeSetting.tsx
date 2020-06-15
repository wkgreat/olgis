import {BasicStyleSettingProps, getColor} from "./basicStyleSetting";
import {Stroke} from "ol/style";
import {Options} from "ol/style/Stroke";
import React, {FC, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {showTitle} from "../tools/toolDialog";
import ColorSetterInput from "../ColorSetter/colorSetterInput";
import Slider from "../common/slider";
import Switch from "../common/switch";

export type StrokeSettingProps = BasicStyleSettingProps<Stroke, Options>

export const defaultOptions: Options = {

    color: "#ffffff",
    lineCap: "round",
    lineJoin: "round",
    lineDash: undefined,
    lineDashOffset: 0,
    miterLimit: 10,
    width: 1.25

};

export const getOptionsFromStroke = (stroke: Stroke): Options => ({
    color: stroke.getColor(),
    lineCap: stroke.getLineCap(),
    lineJoin: stroke.getLineJoin(),
    lineDash: stroke.getLineDash(),
    lineDashOffset: stroke.getLineDashOffset(),
    miterLimit: stroke.getMiterLimit(),
    width: stroke.getWidth()
});

const getOptions = (style ?: Stroke | Options) => {

    if(style instanceof Stroke) {
        return Object.assign({}, getOptionsFromStroke(style));
    } else {
        return Object.assign(Object.assign({}, defaultOptions), style);
    }

};

const StrokeSetting: FC<StrokeSettingProps> = ({open, style, onChange, paperProps, title}) => {

    const [options, setOptions] = useState(getOptions(style));
    const [enableLineDash,setEnableLineDash] = useState(Boolean(options.lineDash));

    const setOp = (opt: Partial<Options>): void => {
        let nopt = Object.assign(options, opt);
        onChange && onChange(nopt);
        setOptions({...nopt});
    };

    if(open) {
        return (
            <Box boxShadow={5}>
                {Boolean(title) ? showTitle(title as string) : null}
                <Box display="flex" p={1} m={1} flexWrap="wrap">
                    <FormControl>
                        <ColorSetterInput label="color" color={getColor(style)} onColorChange={(color)=>setOp({color})}/>
                    </FormControl>
                    <FormControl style={{marginLeft: 10}}>
                        <InputLabel shrink>lineCap</InputLabel>
                        <Select
                                value={options.lineCap}
                                onChange={(event)=>setOp({lineCap:event.target.value as CanvasLineCap})}
                        >
                            <MenuItem value="round">round</MenuItem>
                            <MenuItem value="butt">butt</MenuItem>
                            <MenuItem value="square">square</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{marginLeft: 10}}>
                        <InputLabel shrink>lineJoin</InputLabel>
                        <Select
                                value={options.lineJoin}
                                onChange={(event)=>setOp({lineJoin:event.target.value as CanvasLineJoin})}

                        >
                            <MenuItem value="round">round</MenuItem>
                            <MenuItem value="bevel">bevel</MenuItem>
                            <MenuItem value="miter">>miter</MenuItem>
                        </Select>
                    </FormControl>
                    <Switch label="EnableLineDash" checked={enableLineDash} onChange={(e,v)=>setEnableLineDash(Boolean(v))}/>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    <Slider
                        wrapper="div"
                        label="lineDash"
                        disabled={!enableLineDash}
                        defaultValue={[1, 2, 4]}
                        valueLabelDisplay="auto"
                        max={20}
                        onChange={(e,v)=>setOp({lineDash: enableLineDash ? v as number[] : undefined})}
                    />
                    <Slider
                        wrapper="div"
                        label="lineDashOffset"
                        disabled={!enableLineDash}
                        value={options.lineDashOffset}
                        min={0}
                        max={20}
                        onChange={(event, value) => {setOp({lineDashOffset: value as number})}}
                        valueLabelDisplay="auto"
                    />
                    <Slider
                        wrapper="div"
                        label="miterLimit"
                        value={options.miterLimit}
                        min={0}
                        max={100}
                        onChange={(event, value) => setOp({miterLimit: value as number})}
                        valueLabelDisplay="auto"
                    />
                    <Slider
                        wrapper="div"
                        label="width"
                        value={options.width}
                        min={0}
                        max={50}
                        onChange={(event, value) => setOp({width: value as number})}
                        valueLabelDisplay="auto"
                    />
                </Box>

            </Box>
        );
    } else {
        return (<></>);
    }

};

export default StrokeSetting;