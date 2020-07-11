import React, {FC, useContext, useState} from "react";
import ToolDialog from "../toolDialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {Divider} from "@material-ui/core";
import {MapContext} from "../../MapContext/mapContext";
import {LayerUtils} from "../../../olmap";

interface AddGeohashFishnetProps {
    open: boolean
}

const AddGeohashFishnet: FC<AddGeohashFishnetProps> = (props) => {
    const olmap = useContext(MapContext);
    const url = "http://localhost:8081/geohash/fishnet";

    const [inputName, setInputName] = useState("geohash-grid");
    const [open, setOpen] = useState(props.open);
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
    const handleInputNameChange = (e:any) => {
        setInputName(e.target.value);
    };
    const isLongitude = (s:string) => {
        let r = /^-?[0-9]+.?[0-9]*$/;
        console.log("isLongitude")
        console.log("isLongitude s="+s + ", " + r.test(s) && Number(s) >= -180 && Number(s) <= 180);
        return r.test(s) && Number(s)>=-180 && Number(s)<=180
    };
    const isLatitude = (s:string) => {
        let r = /^-?[0-9]+.?[0-9]*$/;
        console.log("isLatitude")
        console.log("isLatitude s="+s + ", " + r.test(s) && Number(s) >= -90 && Number(s)<=90);
        return r.test(s) && Number(s)>=-90 && Number(s)<=90
    };

    const onWestChange = (e:any) => {
        let v = e.target.value;
        setWestError(!isLongitude(v));
        setWest(v)
    };
    const onEastChange = (e:any) => {
        let v = e.target.value;
        setEastError(!isLongitude(v));
        setEast(v)
    };
    const onSouthChange = (e:any) => {
        let v = e.target.value;
        setSouthError(!isLatitude(v));
        setSouth(v)
    };
    const onNorthChange = (e:any) => {
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
                const layer = LayerUtils.makeGeoJsonLayer(olmap, inputName, res.data.data);
                if(layer) {
                    LayerUtils.addLayer(olmap, layer);
                    LayerUtils.zoomToLayer(olmap, layer.get('name'));
                }
            }).catch(()=>{
        });

    };

    return (
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
                           onChange={(e)=>{setLen(Number(e.target.value))}}
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
    )
};

export default AddGeohashFishnet;