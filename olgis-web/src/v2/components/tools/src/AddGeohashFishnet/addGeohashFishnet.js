import React, {useContext, useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ToolDialog from "../ToolDialog";
import {MapContext} from "../../../mapContext";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as LAYERS from "../../../../../olmap/olmapLayer";
import axios from "axios";
import {Divider} from "@material-ui/core";

const AddGeohashFishnet = React.forwardRef((props, ref) => {

    const olmap = useContext(MapContext);
    const url = "http://localhost:8081/geohash/fishnet";

    const [inputName, setInputName] = useState("geohash-grid");
    const [open, setOpen] = useState(false);
    const [len, setLen] = useState(6);
    const [west, setWest] = useState(0);
    const [east, setEast] = useState(0);
    const [south, setSouth] = useState(0);
    const [north, setNorth] = useState(0);
    const [westError, setWestError] = useState(false);
    const [eastError, setEastError] = useState(false);
    const [southError, setSouthError] = useState(false);
    const [northError, setNorthError] = useState(false);

    const onHandlerClick = () => {
        setOpen(true)
    };
    const handleInputNameChange = (e) => {
        setInputName(e.target.value);
    };
    const isLongitude = (s) => {
        let r = /^-?[0-9]+.?[0-9]*$/;
        console.log("isLongitude")
        console.log("isLongitude s="+s + ", " + r.test(s) && r >= -180 && r<=180);
        return r.test(s) && s>=-180 && s<=180
    };
    const isLatitude = (s) => {
        let r = /^-?[0-9]+.?[0-9]*$/;
        console.log("isLatitude")
        console.log("isLatitude s="+s + ", " + r.test(s) && r >= -90 && r<=90);
        return r.test(s) && s>=-90 && s<=90
    };

    const onWestChange = (e) => {
        let v = e.target.value;
        setWestError(!isLongitude(v));
        setWest(v)
    };
    const onEastChange = (e) => {
        let v = e.target.value;
        setEastError(!isLongitude(v));
        setEast(v)
    };
    const onSouthChange = (e) => {
        let v = e.target.value;
        setSouthError(!isLatitude(v));
        setSouth(v)
    };
    const onNorthChange = (e) => {
        let v = e.target.value;
        setNorthError(!isLatitude(v));
        setNorth(v)
    };

    const handleOK = () => {
        addGeoHashGridLayer();
        setOpen(false)
    };
    const handleCancel = () => {
        setOpen(false)
    };

    const addGeoHashGridLayer = () => {

        axios.get(url,{params: {west,east,south,north,len}})
            .then(res=>{
                const layer = LAYERS.makeGeoJsonLayer(olmap, inputName, res.data.data);
                olmap.addLayer(layer);
                LAYERS.zoomToLayer(olmap, layer.get('name'));
                console.log(res.data)
            }).catch(()=>{
        });

    };

    return (

        <>
            <MenuItem ref={ref} onClick={onHandlerClick} {...props.handlerProps} dense={true}>
                添加GeoHash格网
            </MenuItem>
            <ToolDialog
                open={open}
                title="添加XYZ瓦片图层"
                onOK={handleOK}
                onCancel={handleCancel}
            >
                <Box component='div'>
                    <TextField id="standard-basic" label="图层名称" value={inputName}
                               margin="normal" fullWidth={true}
                               onChange={handleInputNameChange}
                    />
                    <Divider/>
                    <TextField id="standard-basic" label="Geohash位数" value={len}
                               margin="normal" fullWidth={true}
                               onChange={(e)=>{setLen(e.target.value)}}
                    />
                    <Divider/>
                    <Typography variant="button"> 经纬度范围: </Typography>
                    <br/>
                    <Grid container>
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            <TextField
                                error={northError}
                                id="extent-north"
                                label="North Latitude"
                                value={north}
                                helperText={northError? "North should in [-90, 90]": ""}
                                onChange={onNorthChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                error={westError}
                                id="filled-error"
                                label="West Longitude"
                                value={west}
                                helperText={eastError ? "West should in [-180, 180]": ""}
                                onChange={onWestChange}/>
                        </Grid>
                        <Grid item xs={4}/>
                        <Grid item xs={4}>
                            <TextField
                                error={eastError}
                                id="filled-error"
                                label="East Longitude"
                                value={east}
                                helperText={eastError ? "East should in [-180, 180]": ""}
                                onChange={onEastChange}/>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            <TextField
                                error={southError}
                                id="filled-error"
                                label="South Latitude"
                                value={south}
                                helperText={southError ? "South should in [-90, 90]": ""}
                                onChange={onSouthChange}/>
                        </Grid>
                    </Grid>
                </Box>
            </ToolDialog>

        </>

    )
});

export default AddGeohashFishnet;