import React, {FC, ReactNode, useContext, useState} from "react";
import {MapContext} from "../../MapContext/mapContext";
import {Options, Units} from 'ol/control/ScaleLine'
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, Grid, MenuItem, Select,
    Slider,
    Switch,
    Typography
} from "@material-ui/core";
import {ScaleLine} from "ol/control";
import BaseToolProps from "../baseToolProps";
import {rowConfig} from "../toolDialog";

;

interface ScalebarSettingProps extends BaseToolProps{
}

/**
 *     className?: string;
 *     minWidth?: number;
 *     render?: (p0: MapEvent) => void;
 *     target?: HTMLElement | string;
 *     units?: Units | string;
 *     bar?: boolean;
 *     steps?: number;
 *     text?: boolean;
 * */
const defaultScalebarOptions: Options = {

    minWidth: 64,
    units: Units.METRIC,
    bar: false,
    steps: 4,
    text: false,

}

const ScalebarSetting: FC<ScalebarSettingProps> = (props) => {

    const olmap = useContext(MapContext);

    const initVisible = () => Boolean(olmap && olmap.scaleLine);
    const initOptions = ():Options => {
        if(initVisible()) {
            let scaleline = olmap.scaleLine as ScaleLine;
            return scaleline.getProperties() as Options;
        } else {
            return defaultScalebarOptions;
        }
    };

    const initV = initVisible();
    const initO = initOptions();

    const [open, setOpen] = useState(props.open);
    const [visible, setVisible] = useState<boolean>(initVisible());
    const [options, setOptions] = useState(initOptions());

    const onOK = (event:any) => {
        if(props.onOK) props.onOK(event);
    };

    const onCancel = (event:any) => {
        if(props.onCancel) props.onCancel(event);
        olmap.setScaleBar(initV, initO);
    }

    const onVisibleChange = (event: any, value: boolean) => {
        setVisible(value);
        olmap.toggleScalaBar(value, options);
    };

    const onBarChange = (event: any, value: any) => {
        options.bar = Boolean(value);
        setOptions({...options});
        olmap.setScaleBar(visible, options);
    };

    const handleMinWidthChange = (event:any, value:any) => {
        options.minWidth = value;
        setOptions({...options});
        olmap.setScaleBar(visible, options);

    };
    const handleStepsChange = (event:any, value:any) => {
        options.steps = value;
        setOptions({...options});
        olmap.setScaleBar(visible, options);

    };
    const handleUnitsChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        options.units = event.target.value as Units;
        setOptions({...options});
        olmap.setScaleBar(visible, options);
    };

    const showTitle = ():ReactNode => {
        return (
            <Box css={{display: 'flex', justifyContent: 'flex-start'}}>
                <Box css={{display: "inline-block"}}>
                    {props.title ? <Typography variant="h6"> {props.title} </Typography> : null}
                </Box>
            </Box>
        )
    }

    const showButton = ():ReactNode => {
        return (
            <Box css={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
                {props.enablerCancel ? <Button variant="outlined" size="small" color="primary" onClick={onCancel}>Cancel</Button> : null}
                {props.enableOK ? <Button variant="outlined" size="small" color="primary" onClick={onOK}>OK</Button> : null}
            </Box>
        )
    };

    const lable = (id:string, value:string): ReactNode => (
        <Typography id={id} gutterBottom>{value}</Typography>
    );

    if(open) {
        return (
            <Box>
                {showTitle()}

                <Grid container spacing={2} justify="flex-end" alignItems="center">
                    {rowConfig("visible", 3, 3, false)(
                        <Switch
                            checked={visible}
                            onChange={onVisibleChange}
                            color="primary"
                            name="visible"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                    )}
                    {rowConfig("bar", 3, 3, false)(
                        <Switch
                            checked={Boolean(options.bar)}
                            onChange={onBarChange}
                            color="primary"
                            name="bar"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                    )}
                    {rowConfig("minWidth", 3, 3, true)(
                        <Slider
                            value={options.minWidth}
                            onChange={handleMinWidthChange}
                            aria-labelledby="input-slider"
                            valueLabelDisplay="auto"
                        />
                    )}

                    {rowConfig("units", 3, 3, true)(
                        <Select
                            value={options.units}
                            onChange={handleUnitsChange}
                        >
                            <MenuItem value="degrees">degrees</MenuItem>
                            <MenuItem value="imperial">imperial inch</MenuItem>
                            <MenuItem value="us">us inch</MenuItem>
                            <MenuItem value="nautical">nautical mile</MenuItem>
                            <MenuItem value="metric" selected>metric</MenuItem>
                        </Select>
                    )}

                    {rowConfig("steps", 3, 3, true)(
                        <Slider
                            value={options.steps}
                            min={0}
                            max={options.minWidth}
                            disabled={!options.bar}
                            onChange={handleStepsChange}
                            aria-labelledby="input-slider"
                            valueLabelDisplay="auto"
                        />
                    )}

                </Grid>
                {showButton()}
            </Box>
        );
    } else {
        return <></>;
    }

};

ScalebarSetting.defaultProps = {
    title: "比例尺设置",
    enableOK: true,
    enablerCancel: true
}

export default ScalebarSetting;