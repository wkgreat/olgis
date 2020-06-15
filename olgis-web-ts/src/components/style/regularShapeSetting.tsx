import {
    BasicStyleSettingProps,
    getOptionsFromRegularShape,
} from "./basicStyleSetting";
import RegularShape, {Options as RegularShapeOptions} from "ol/style/RegularShape";
import React, {FC, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import {showTitle} from "../tools/toolDialog";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import StrokeSetting, {defaultOptions as defaultStrokeOptions} from './strokeSetting'
import FillSetting from "./fillSetting";
import Slider from "../common/slider";
import TextField from "../common/textField";

export type RegularShapeSettingProps = BasicStyleSettingProps<RegularShape, RegularShapeOptions>

export const defaultOptions: RegularShapeOptions = {
    fill: new Fill({color: "#5383ff"}),
    points: 4,
    radius: 2,
    radius1: 2,
    radius2: 2,
    angle: 0,
    displacement: [0,0],
    stroke: new Stroke(defaultStrokeOptions),
    rotation: 0,
    rotateWithView: false
};

const RegularShapeSetting: FC<RegularShapeSettingProps> = (props) => {

    const {
        open,
        paperProps,
        style,
        title,
        onChange
    } = props;

    const getOptions = (style ?: RegularShape | RegularShapeOptions) => {

        if(style instanceof RegularShape) {
            return Object.assign({}, getOptionsFromRegularShape(style));
        } else {
            return Object.assign(Object.assign({}, defaultOptions), style);
        }

    };

    const [options, setOptions] = useState(getOptions(style));

    const setOp = (opt: Partial<RegularShapeOptions>): void => {
        let nopt = Object.assign(options, opt);
        onChange && onChange(nopt);
        setOptions({...nopt});
    };

    if(open) {
        return (
            <Box boxShadow={5}>
                {Boolean(title) ? showTitle(title as string) : null}
                <div><Typography variant="button">RegularShape</Typography></div>
                <Box boxShadow={5}>
                    <Box display="flex" p={1} m={1} flexWrap="wrap">
                        <TextField id="filled-number" label="Points" type="number" inputProps={{min:0, step:1, max:20}}
                                   value={options.points} onChange={(e)=>setOp({points:Number(e.target.value)})}
                                   InputLabelProps={{shrink: true}} size="small"
                        />
                        <TextField id="filled-number" label="Radius" type="number" inputProps={{min:0, step:0.1, max:100}}
                                   value={options.radius} onChange={(e)=>setOp({radius:Number(e.target.value)})}
                                   InputLabelProps={{shrink: true}} size="small"
                        />
                        <TextField id="filled-number" label="Radius1" type="number" inputProps={{min:0, step:0.1, max:100}}
                                   value={options.radius1} onChange={(e)=>setOp({radius1:Number(e.target.value)})}
                                   InputLabelProps={{shrink: true}} size="small"
                        />
                        <TextField id="filled-number" label="Radius2" type="number" inputProps={{min:0, step:0.1, max:100}}
                                   value={options.radius2} onChange={(e)=>setOp({radius2:Number(e.target.value)})}
                                   InputLabelProps={{shrink: true}} size="small"
                        />
                        <TextField id="filled-number" label="Angle" type="number" inputProps={{min:-360, step:0.1, max:360}}
                                   value={options.angle} onChange={(e)=>setOp({angle:Number(e.target.value)})}
                                   InputLabelProps={{shrink: true}} size="small"
                        />
                    </Box>
                    <Box>
                        <Slider
                            label="Displacement"
                            track={false}
                            value={options.displacement}
                            valueLabelDisplay="auto"
                            max={20}
                            onChange={(e,v)=>setOp({displacement:v as number[]|undefined})}
                        />
                    </Box>
                </Box>


                <div><Typography variant="button">RegularShape Fill</Typography></div>
                <Box>
                    <FillSetting open={true} style={options.fill} onChange={opt=>setOp({fill:new Fill(opt)})}/>
                </Box>
                <div><Typography variant="button">RegularShape Stroke</Typography></div>
                <Box>
                    <StrokeSetting open={true} onChange={(opts)=>setOp({stroke: new Stroke(opts)})}/>
                </Box>
            </Box>
        );
    } else {
        return <></>;
    }

};

export default RegularShapeSetting;