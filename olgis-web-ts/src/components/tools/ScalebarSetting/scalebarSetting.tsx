import React, {FC, useContext, useEffect, useState} from "react";
import {MapContext} from "../../MapContext/mapContext";
import {Options, Units} from 'ol/control/ScaleLine'
import {Box, Grid, MenuItem, Select, Slider, Switch} from "@material-ui/core";
import {ScaleLine} from "ol/control";
import BaseToolProps from "../baseToolProps";
import {rowConfig, showButton, showTitle} from "../toolDialog";

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
        setOpen(false);
        if(props.onOK) props.onOK(event);
    };

    const onCancel = (event:any) => {
        setOpen(false);
        if(props.onCancel) props.onCancel(event);
        olmap.setScaleBar(initV, initO);
    }

    const onVisibleChange = (event: any, value: boolean) => {
        setVisible(value);
        olmap.toggleScalaBar(value, options);
    };

    useEffect(()=>{
        let overlayDiv = document.getElementsByClassName("ol-overlaycontainer-stopevent").item(0);
        let scaleDiv = document.getElementsByClassName("ol-scale-line").item(0) ||
            document.getElementsByClassName("ol-scale-bar").item(0);
        if(open && visible && overlayDiv && scaleDiv) {
            let theOverlayDiv = overlayDiv as HTMLDivElement;
            let theScaleDiv = scaleDiv as HTMLDivElement;
            theOverlayDiv.style.zIndex = "2000";
            theScaleDiv.style.zIndex = "2000";
        }
        if(!open) {
            if (overlayDiv && scaleDiv){
                let theOverlayDiv = overlayDiv as HTMLDivElement;
                let theScaleDiv = scaleDiv as HTMLDivElement;
                theOverlayDiv.style.zIndex = "0";
                theScaleDiv.style.zIndex = "0";
        }}
    });

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

    if(open) {
        return (
            <Box>
                {showTitle(props.title || "")}
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
                    {rowConfig("minWidth", 3, 9, false)(
                        <Slider
                            value={options.minWidth}
                            min={0}
                            max={1000}
                            onChange={handleMinWidthChange}
                            aria-labelledby="input-slider"
                            valueLabelDisplay="auto"
                        />
                    )}

                    {rowConfig("steps", 3, 9, true)(
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
                {showButton(Boolean(props.enableOK), onOK, Boolean(props.enableCancel), onCancel)}
            </Box>
        );
    } else {
        return <></>;
    }

};

ScalebarSetting.defaultProps = {
    title: "比例尺设置",
    enableOK: true,
    enableCancel: true
}

export default ScalebarSetting;