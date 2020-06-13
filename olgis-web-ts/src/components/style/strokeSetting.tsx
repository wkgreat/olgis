import {BasicStyleSettingProps, getColor} from "./basicStyleSetting";
import {Stroke} from "ol/style";
import {Options} from "ol/style/Stroke";
import React, {ChangeEvent, FC, useState} from "react";
import {Box, Grid, MenuItem, Paper, Select, Slider, Switch} from "@material-ui/core";
import {rowConfig, showTitle} from "../tools/toolDialog";
import ColorSetterInput from "../ColorSetter/colorSetterInput";

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
            <Paper {...paperProps}>
                {Boolean(title) ? showTitle(title as string) : null}
                <Grid container spacing={4} alignItems="center">
                    {rowConfig("Color",3,3, false)(
                        <ColorSetterInput label="color" color={getColor(style)} onColorChange={(color)=>setOp({color})}/>
                    )}
                    {rowConfig("lineCap", 3, 3, false)(
                        <Select
                            value={options.lineCap}
                            onChange={(event)=>setOp({lineCap:event.target.value as CanvasLineCap})}
                        >
                            <MenuItem value="round">round</MenuItem>
                            <MenuItem value="butt">butt</MenuItem>
                            <MenuItem value="square">square</MenuItem>
                        </Select>
                    )}
                    {rowConfig("lineJoin", 3, 3, false)(
                        <Select
                            value={options.lineJoin}
                            onChange={(event)=>setOp({lineJoin:event.target.value as CanvasLineJoin})}
                        >
                            <MenuItem value="round">round</MenuItem>
                            <MenuItem value="bevel">bevel</MenuItem>
                            <MenuItem value="miter">miter</MenuItem>
                        </Select>
                    )}
                    {rowConfig("Enable lineDash", 3, 3, false)(
                        <Switch checked={enableLineDash} onChange={(e,v)=>setEnableLineDash(v)}/>
                    )}
                    {rowConfig(`lineDash ${options.lineDash ? options.lineDash.join('.'):""}`, 3, 3, false)(
                        <Slider
                            track={false}
                            disabled={!enableLineDash}
                            aria-labelledby="track-false-range-slider"
                            defaultValue={[1, 2, 4]}
                            valueLabelDisplay="auto"
                            max={20}
                            onChange={(e,v)=>setOp({lineDash: enableLineDash ? v as number[] : undefined})}
                        />
                    )}
                    {rowConfig("lineDashOffset", 3, 3, false)(
                        <Slider
                            disabled={!enableLineDash}
                            value={options.lineDashOffset}
                            min={0}
                            max={20}
                            onChange={(event, value) => {setOp({lineDashOffset: value as number})}}
                            aria-labelledby="input-slider"
                            valueLabelDisplay="auto"
                        />
                    )}
                    {rowConfig("miterLimit", 3, 3, false)(
                        <Slider
                            value={options.miterLimit}
                            min={0}
                            max={100}
                            onChange={(event, value) => setOp({miterLimit: value as number})}
                            aria-labelledby="input-slider"
                            valueLabelDisplay="auto"
                        />
                    )}
                    {rowConfig("width", 3, 3, false)(
                        <Slider
                            value={options.width}
                            min={0}
                            max={50}
                            onChange={(event, value) => setOp({width: value as number})}
                            aria-labelledby="input-slider"
                            valueLabelDisplay="auto"
                        />
                    )}
                </Grid>
            </Paper>
        );
    } else {
        return (<></>);
    }

};

export default StrokeSetting;