import React, {FC, useContext, useEffect, useState} from "react"
import BaseToolProps from "../../baseToolProps";
import ToolDialog from "../../toolDialog";
import {MapContext} from "../../../MapContext/mapContext";
import useCurrentViewExtent from "../../../../hooks/useCurrentViewExtent";
import axios from "axios";
import {LayerUtils} from "../../../../olmap";
import {Box} from "@material-ui/core";
import TextField from "../../../common/textField";
import ExtentSetting from "../../ExtentSetting/extentSetting";
import {Extent} from "ol/extent";
import {arrayEquals} from "../../../../olmap/utils";

export interface AddUberH3GridByExtentProps extends BaseToolProps{}

const AddUberH3GridByExtent: FC<AddUberH3GridByExtentProps> = (props) => {

    const url = "http://localhost:8081/grid/h3/getH3Grid";

    const olmap = useContext(MapContext);

    const [open, setOpen] = useState(!!props.open);
    const [layerName, setLayerName] = useState("uber-u3-extent-grid");
    const [res, setRes] = useState(0);
    const [extent, setExtent] = useState(useCurrentViewExtent(olmap,"EPSG:4326"));

    useEffect(()=>{
        setOpen(!!props.open);
    },[props.signal, props.open]);

    const handleLayerNameChange = (e:any) => {
        const theName = e.target.value;
        if(theName!==layerName) {
            setLayerName(theName);
        }
    };

    const handleResChange = (e:any) => {
      const theRes = e.target.value;
      if(res!==theRes) {
          setRes(theRes);
      }
    };

    const handleExtentChange = (theExtent: Extent) => {
        if(!arrayEquals(extent,theExtent)) {
            setExtent(theExtent);
        }
    };

    const onOK = () => {
        addU3GridLayer();
        setOpen(!open);
    };

    const onCancel = () => {
        setOpen(!open);
    };

    const addU3GridLayer = () => {

        const params = {
            west: extent[0],
            south: extent[1],
            east: extent[2],
            north: extent[3],
            res: res
        };

        axios.get(url,{params})
            .then(res=>{
                const layer = LayerUtils.makeGeoJsonLayer(olmap, layerName, res.data.data);
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
            onOK={onOK}
            onCancel={onCancel}
            title="根据经纬度矩形范围添加Uber-H3索引网格"
        >
            <Box>
                <TextField id="standard-basic" label="图层名称" value={layerName}
                           margin="normal" fullWidth={true}
                           onChange={handleLayerNameChange}
                           checker={(s)=>!!s}
                           errorText={"图层名称不能为空"}
                />
                <TextField id="standard-basic" label="H3格网分辨率" value={res}
                           margin="normal" fullWidth={true}
                           onChange={handleResChange}
                           checker={(s)=>!!s}
                           errorText={"不能为空"}
                />
                <ExtentSetting
                    value={extent}
                    onChange={handleExtentChange}
                />
            </Box>
        </ToolDialog>
    )

};

export default AddUberH3GridByExtent;
