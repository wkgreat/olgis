import React, {FC, useContext, useEffect, useState} from 'react';
import BaseToolProps from "../../baseToolProps";
import ToolDialog from "../../toolDialog";
import {Box} from "@material-ui/core";
import TextField from "../../../common/textField";
import {isLatitude, isLongitude, isValidInt} from "../../../../olmap/utils";
import axios from "axios";
import {LayerUtils} from "../../../../olmap";
import {MapContext} from "../../../MapContext/mapContext";
import {genRequestId, SERVICE_URL, WEBSOCKET_URL} from "../../../common/utils";
import useRequestProgress from "../../../../hooks/useRequestProgress";
import {useSnackbar} from "notistack";

interface AddUberH3CellProps extends BaseToolProps{

}

const AddUberH3Cell: FC<AddUberH3CellProps> = (props) => {

    const url = `${SERVICE_URL}/grid/h3/getH3Boundary`;

    const olmap = useContext(MapContext);
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(!!props.open);
    const [layerName, setLayerName] = useState("h3-cell");
    const [res, setRes] = useState(0);
    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);

    //progress
    const [requestId, setRequestId] = useState<string>("");
    const wsUrl = `${WEBSOCKET_URL}/requestProgress/${requestId}`;
    const progress = useRequestProgress(wsUrl, requestId, open);

    useEffect(()=>{
        setOpen(!!props.open);
    }, [props.signal, props.open]);

    const handleLayerNameChange = (e:any) => {
        setLayerName(e.target.value);
    };

    const onOK = () => {
        addU3Layer();
        //setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };

    const addU3Layer = () => {
        const rid = genRequestId("AddGeohashFishnet");
        setRequestId(rid);
        axios.get(url,{params: {requestId: rid, lon,lat,res}})
            .then(res=>{
                const layer = LayerUtils.makeGeoJsonLayer(olmap, layerName, res.data.data);
                if(layer) {
                    LayerUtils.addLayer(olmap, layer);
                    LayerUtils.zoomToLayer(olmap, layer.get('name'));
                }
            })
            .catch((error)=>{
                console.log(error);
                enqueueSnackbar(`ERROR: ${rid} 执行失败 [${error.toString()}]`, {variant: 'error'});
            });
    };

    return (
        <ToolDialog
            open={open}
            onOK={onOK}
            onCancel={onCancel}
            title="添加Uber-H3索引格子"
            progress={progress}
        >
            <Box>
                <TextField id="standard-basic" label="图层名称" value={layerName}
                           margin="normal" fullWidth={true}
                           onChange={handleLayerNameChange}
                           checker={(s)=>!!s}
                           errorText={"图层名称不能为空"}
                />
                <TextField id="standard-basic" label="H3分辨率" value={res}
                           margin="normal" fullWidth={true}
                           onChange={(e:any)=>setRes(e.target.value)}
                           checker={(e:string)=>isValidInt(e,0,15)}
                           errorText={"H3分辨率应该为整数，并在[0,15]区间内"}
                />
                <TextField id="standard-basic" label="点经度" value={lon}
                           margin="normal" fullWidth={true}
                           onChange={(e:any)=>setLon(e.target.value)}
                           checker={isLongitude}
                           errorText={"需要满足经度格式"}
                />
                <TextField id="standard-basic" label="点纬度" value={lat}
                           margin="normal" fullWidth={true}
                           onChange={(e:any)=>setLat(e.target.value)}
                           checker={isLatitude}
                           errorText={"需要满足纬度格式"}
                />
            </Box>
        </ToolDialog>
    )

};

export default AddUberH3Cell;
