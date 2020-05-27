import React, {useContext, useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ToolDialog from "../ToolDialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import {Switch} from "@material-ui/core";
import * as LAYERS from "../../../../../olmap/olmapLayer";
import {MapContext} from "../../../mapContext";

/**
 * TODO UNFISHED
 * postpone
 * wait until ol/layer/MapboxVector
 * released in the later version of openLayers
 * */
const AddXYZVectorLayer = React.forwardRef((props, ref) => {

    const olmap = useContext(MapContext);

    const defaultURL = "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/{z}/{x}/{y}.vector.pbf"

    const [open, setOpen] = useState(false);
    const [layerName, setLayerName] = useState("vectorTileLayer");
    const [url, setURL] = useState(defaultURL);
    const [token, setToken] = useState("");
    const [declutter, setDeclutter] = useState(true);

    const onHandlerClick = () => {
        setOpen(true);
    };

    const handleOK = () => {
        let fullURL = makeURL(url, token);
        let layer = LAYERS.makeXYZVectorLayer(olmap, layerName, fullURL);
        olmap.addLayer(layer);
        setOpen(false)
    };

    const handleCancel = () => {
        setOpen(false)
    };

    const makeURL = (url, token) => {
        if(!token) {
            return url
        }
        return `${url}?access_token=${token}`;
    };

    const handleLayerNameChange = (e) => {
        setLayerName(e.target.value)
    };

    const handleURLChange = (e) => {
        setURL(e.target.value)
    };

    const handleTokenChange = (e) => {
        setToken(e.target.value)
    };

    const handleDeclutterChange = (e) => {
        console.log(e);
        setDeclutter(e.target.value)
    };

    return (
        <>
            <MenuItem ref={ref} onClick={onHandlerClick} {...props.handlerProps} dense={true}>
                添加XYZ矢量瓦片图层
            </MenuItem>
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
                        <Switch
                            checked={declutter}
                            onChange={handleDeclutterChange}
                            name="Declutter"
                            label="Declutter"
                            color="primary"
                        />
                    </form>
                </Box>
            </ToolDialog>
        </>
    )
});

export default AddXYZVectorLayer;