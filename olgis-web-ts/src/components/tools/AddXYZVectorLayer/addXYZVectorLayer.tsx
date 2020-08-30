import React, {FC, useContext, useEffect, useState} from "react";
import ToolDialog from "../toolDialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import {MapContext} from "../../MapContext/mapContext";
import {LayerUtils} from "../../../olmap";
import {LabeledSwitch} from "../../common/labeledSwitch";
import BaseToolProps from "../baseToolProps";

interface AddXYZVectorLayerProps extends BaseToolProps{}

const AddXYZVectorLayer:FC<AddXYZVectorLayerProps> = (props) => {

    const olmap = useContext(MapContext);

    const defaultURL = "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/{z}/{x}/{y}.vector.pbf";

    const [open, setOpen] = useState(props.open);
    const [layerName, setLayerName] = useState("vectorTileLayer");
    const [url, setURL] = useState(defaultURL);
    const [token, setToken] = useState("");
    const [declutter, setDeclutter] = useState(true);

    useEffect(()=>{
        setOpen(props.open)
    }, [props.open, props.signal]);

    const handleOK = () => {
        let fullURL = makeURL(url, token);
        let layer = LayerUtils.makeXYZVectorLayer(olmap, layerName, fullURL);
        LayerUtils.addLayer(olmap,layer);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const makeURL = (url:string, token:string) => {
        if(!token) {
            return url
        }
        return `${url}?access_token=${token}`;
    };

    const handleLayerNameChange = (e:any) => {
        setLayerName(e.target.value)
    };

    const handleURLChange = (e:any) => {
        setURL(e.target.value)
    };

    const handleTokenChange = (e:any) => {
        setToken(e.target.value)
    };

    const handleDeclutterChange = (e:any) => {
        console.log(e);
        setDeclutter(e.target.value)
    };

    if(open) {
        return (
            <ToolDialog
                open={open}
                title="添加XYZ矢量瓦片图层"
                onOK={handleOK}
                onCancel={handleCancel}
            >
                <Box component='div'>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="图层名称" value={layerName}
                                   margin="normal" fullWidth={true}
                                   onChange={handleLayerNameChange}
                        />
                        <br/>
                        <TextField id="standard-basic" label="XYZ URL" value={url}
                                   margin="normal" fullWidth={true}
                                   onChange={handleURLChange}
                                   helperText="XYZ格式URL, 例如pbf格式的矢量瓦片"/>
                        <br/>
                        <TextField id="standard-basic" label="Token" value={token}
                                   margin="normal" fullWidth={true}
                                   onChange={handleTokenChange}
                                   helperText="Token"/>
                        <br/>
                        <LabeledSwitch
                            label="declutter"
                            checked={declutter}
                            onChange={handleDeclutterChange}
                            name="Declutter"
                            color="primary"
                        />
                    </form>
                </Box>
            </ToolDialog>
        );
    } else {
        return <></>;
    }

};

export default AddXYZVectorLayer;
