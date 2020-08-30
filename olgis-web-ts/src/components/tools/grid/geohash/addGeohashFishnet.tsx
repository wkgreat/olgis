import React, {FC, useContext, useEffect, useState} from "react";
import ToolDialog from "../../toolDialog";
import Box from "@material-ui/core/Box";
import axios from "axios";
import {Divider} from "@material-ui/core";
import {MapContext} from "../../../MapContext/mapContext";
import {LayerUtils} from "../../../../olmap";
import BaseToolProps from "../../baseToolProps";
import TextField from "../../../common/textField";
import ExtentSetting from "../../ExtentSetting/extentSetting";
import {Extent} from "ol/extent";
import {SERVICE_URL} from "../../../common/utils";

interface AddGeohashFishnetProps extends BaseToolProps{
}

const AddGeohashFishnet: FC<AddGeohashFishnetProps> = (props) => {
    const olmap = useContext(MapContext);

    //TODO URL configurable
    const url = `${SERVICE_URL}/grid/geohash/fishnet`;

    const [inputName, setInputName] = useState("geohash-grid");
    const [open, setOpen] = useState(!!props.open);
    const [len, setLen] = useState(6);
    const [west, setWest] = useState(0);
    const [east, setEast] = useState(0);
    const [south, setSouth] = useState(0);
    const [north, setNorth] = useState(0);

    useEffect(()=>{
        setOpen(!!props.open);
    }, [props.open, props.signal]);

    const handleInputNameChange = (e:any) => {
        setInputName(e.target.value);
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
            })
            .catch((error)=>{
                console.log(error);
            });

    };

    return (
        <ToolDialog
            open={open}
            title="添加Geohash渔网图层"
            onOK={handleOK}
            onCancel={handleCancel}
        >
            <Box component='div'>
                <TextField id="standard-basic" label="图层名称" value={inputName}
                           margin="normal" fullWidth={true}
                           onChange={handleInputNameChange}
                           checker={(s)=>!!s}
                           errorText={"图层名称不能为空"}
                />
                <Divider/>
                <TextField id="standard-basic" label="Geohash位数" value={len}
                           margin="normal" fullWidth={true}
                           onChange={(e)=>{setLen(Number(e.target.value))}}
                />
                <Divider/>
                <ExtentSetting
                    value={[0,0,0,0]}
                    onChange={(extent: Extent)=>{
                    setWest(extent[0]);
                    setSouth(extent[1]);
                    setEast(extent[2]);
                    setNorth(extent[3]);
                }}/>
            </Box>
        </ToolDialog>
    )
};

export default AddGeohashFishnet;
