import React, {FC, useContext, useEffect, useState} from "react";
import {Box, IconButton, Tooltip} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AspectRatioTwoToneIcon from '@material-ui/icons/AspectRatioTwoTone';
import Grid from "@material-ui/core/Grid";
import TextField from "../../common/textField";
import {arrayEquals, isLongitude} from "../../../olmap/utils";
import useCurrentViewExtent from "../../../hooks/useCurrentViewExtent";
import {MapContext} from "../../MapContext/mapContext";
import {Extent} from "ol/extent";

interface ExtentSettingProps {
    /**是否跟随地图当前视野范围变化*/
    useMapViewExtent ?: boolean
    /**初始Extent对象*/
    value ?: Extent
    /**加载时回调函数*/
    onLoad ?: (extent: Extent) => void
    /**Extent变化回调函数*/
    onChange ?: (extent: Extent) => void
}

/**
 * 经纬度矩形范围设置组件
 * */
const ExtentSetting: FC<ExtentSettingProps> = (props) => {

    const olmap = useContext(MapContext);

    const [useMapViewExtent, setUseMapViewExtent] = useState(!!props.useMapViewExtent);
    const [extent, setExtent] = useState<Extent>(props.value||[0,0,0,0]);

    const onUseMapViewExtentClick = () => {
        setUseMapViewExtent(!useMapViewExtent);
    };

    const mapViewExtent = useCurrentViewExtent(olmap,"EPSG:4326");

    useEffect(()=>{
        if(useMapViewExtent && props.onLoad) {
            if(!arrayEquals(mapViewExtent, extent)) {
                setExtent(mapViewExtent);
            }
            props.onLoad(mapViewExtent);
        }
    }, []);

    useEffect(()=>{
        if(useMapViewExtent && !arrayEquals(mapViewExtent, extent)) {
            setExtent(mapViewExtent);
            if(props.onChange) {
                props.onChange(mapViewExtent);
            }
        }
    },[mapViewExtent, useMapViewExtent]);

    const setExtentValue = (s: string, index: 0 | 1 | 2 | 3) => {
        const v: number = Number(s);
        if(!isNaN(v) && extent[index]!==v) {
            extent[index] = v;
            setExtent([extent[0],extent[1],extent[2],extent[3]]);
            if(props.onChange) {
                props.onChange(extent);
            }
        }
    };

    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Box flexGrow={1}><Typography variant="button"> 经纬度范围: </Typography></Box>
                <Box>
                    <Typography variant="subtitle2">{`使用当前地图可视范围: -> ${useMapViewExtent ? "on" : "off"}`}</Typography>
                </Box>
                <Box>
                    <Tooltip title="使用当前地图可视范围">
                        <IconButton onClick={onUseMapViewExtentClick} color={useMapViewExtent ? "secondary" : "default"}>
                            <AspectRatioTwoToneIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>

            </Box>

            <br/>
            <Grid container>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <TextField
                        id="extent-north"
                        label="North Latitude"
                        value={extent[3]}
                        onChange={(e)=>setExtentValue(e.target.value,3)}
                        checker={isLongitude}
                        errorText="North should in [-90, 90]"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="filled-error"
                        label="West Longitude"
                        value={extent[0]}
                        onChange={(e)=>setExtentValue(e.target.value,0)}
                        checker={isLongitude}
                        errorText="West should in [-180, 180]"
                    />
                </Grid>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <TextField
                        id="filled-error"
                        label="East Longitude"
                        value={extent[2]}
                        onChange={(e)=>setExtentValue(e.target.value,2)}
                        checker={isLongitude}
                        errorText="East should in [-180, 180]"
                    />
                </Grid>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <TextField
                        id="filled-error"
                        label="South Latitude"
                        value={extent[1]}
                        onChange={(e)=>setExtentValue(e.target.value,1)}
                        checker={isLongitude}
                        errorText="South should in [-90, 90]"
                    />
                </Grid>
            </Grid>
        </Box>
    )

};

ExtentSetting.defaultProps = {
    useMapViewExtent: true,
    value: [0,0,0,0]
};

export default ExtentSetting;
