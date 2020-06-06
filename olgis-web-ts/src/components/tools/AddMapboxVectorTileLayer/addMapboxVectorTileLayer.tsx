import React, {FC, useState} from "react";
import ToolDialog from "../toolDialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import {Switch} from "@material-ui/core";

interface AddMapboxVectorTileLayerProps {
    open : boolean
}

/**
 * TODO UNFISHED
 * postpone
 * wait until ol/layer/MapboxVector
 * released in the later version of openLayers
 * */
const AddMapboxVectorTileLayer: FC<AddMapboxVectorTileLayerProps> = (props) => {
    const [open, setOpen] = useState(Boolean(props.open));
    const [layerName, setLayerName] = useState("mapbox-vector-layer")
    const [styleUrl, setStyleUrl] = useState("")
    const [token, setToken] = useState("")
    const [declutter, setDeclutter] = useState(true)

    const onHandlerClick = () => {
        setOpen(true);
    };

    const handleOK = () => {
    }

    const handleCancel = () => {
    }

    const handleLayerNameChange = (e: any) => {
        setLayerName(e.target.value)
    }

    const handleStyleURLChange = (e: any) => {
        setStyleUrl(e.target.value)
    }

    const handleTokenChange = (e: any) => {
        setToken(e.target.value)
    }

    const handleDeclutterChange = (e: any) => {
        setDeclutter(e.target.value)
    }


    return (
        <>
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
};

export default AddMapboxVectorTileLayer;