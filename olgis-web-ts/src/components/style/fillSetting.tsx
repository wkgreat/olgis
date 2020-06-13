import {BasicStyleSettingProps, getColor} from "./basicStyleSetting";
import Fill, {Options as FillOptions} from "ol/style/Fill";
import React, {FC} from "react";
import {Box, Grid, GridSize, MenuItem, Paper, Select, Slider, Switch, Typography} from "@material-ui/core";
import {rowConfig, showTitle} from "../tools/toolDialog";
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
            <Paper {...paperProps}>
                {Boolean(title) ? showTitle(title as string) : null}
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={3}>
                        <div style={{display:"flex", flexDirection:"row-reverse"}}>
                            <Typography>Color</Typography></div></Grid>
                    <Grid item xs={3}><ColorSetterInput label="Fill Color" color={getColor(style)} onColorChange={onColorChange}/></Grid>
                </Grid>
            </Paper>
        );
    } else {
        return <></>;
    }


};

export default FillSetting;