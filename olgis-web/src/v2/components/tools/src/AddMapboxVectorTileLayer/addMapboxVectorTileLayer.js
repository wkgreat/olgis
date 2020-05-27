import React, {useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ToolDialog from "../ToolDialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import {Switch} from "@material-ui/core";
import * as LAYERS from "../../../../../olmap/olmapLayer";

/**
 * TODO UNFISHED
 * postpone
 * wait until ol/layer/MapboxVector
 * released in the later version of openLayers
 * */
const AddMapboxVectorTileLayer = React.forwardRef((props, ref) => {

    const [open, setOpen] = useState(false);
    const [layerName, setLayerName] = useState("mapbox-vector-layer")
    const [styleUrl, setStyleUrl] = useState("")
    const [token, setToken] = useState("")
    const [declutter, setDeclutter] = useState(true)

    const onHandlerClick = () => {
        setOpen(true);
    };

    const handleOK = () => {}

    const handleCancel = () => {}

    const handleLayerNameChange = (e) => {
        setLayerName(e.target.value)
    }

    const handleStyleURLChange = (e) => {
        setStyleUrl(e.target.value)
    }

    const handleTokenChange = (e) => {
        setToken(e.target.value)
    }

    const handleDeclutterChange = (e) => {
        console.log(e)
        setDeclutter(e.target.value)
    }


    return (
        <>
            <MenuItem ref={ref} onClick={onHandlerClick} {...props.handlerProps} dense={true}>
                添加Mapbox矢量瓦片
            </MenuItem>
            <ToolDialog
                open={open}
                title="添加XYZ瓦片图层"
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
                        <TextField id="standard-basic" label="Style URL" value={styleUrl}
                                   margin="normal" fullWidth={true}
                                   onChange={handleStyleURLChange}
                                   helperText="Mapbox Style Url"/>
                        <br/>
                        <TextField id="standard-basic" label="Token" value={token}
                                   margin="normal" fullWidth={true}
                                   onChange={handleTokenChange}
                                   helperText="Mapbox Token"/>
                        <br/>
                        <Switch
                            checked={declutter}
                            onChange={handleDeclutterChange}
                            name="Declutter"
                            color="primary"
                        />
                    </form>
                </Box>
            </ToolDialog>
        </>
    )


});