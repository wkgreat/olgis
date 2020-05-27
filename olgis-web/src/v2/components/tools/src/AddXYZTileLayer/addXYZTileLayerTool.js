import React, {Component, Fragment, useEffect} from "react";
import Box from "@material-ui/core/Box";
import ToolDialog from "../ToolDialog";
import TextField from "@material-ui/core/TextField";
import {MenuItem} from "@material-ui/core";
import {MapContext} from "../../../mapContext";
import * as LAYERS from "../../../../../olmap/olmapLayer";

const AddXYZTileLayerTool = React.forwardRef((props, ref)=> {

    const olmap = React.useContext(MapContext);
    const [open, setOpen] = React.useState(props.open || false);
    const [inputName, setInputName] = React.useState("OSM Black and White");
    const [inputURL, setInputURL] = React.useState("http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png");

    return (
        <>
            <MenuItem ref={ref} onClick={onHandlerClick} {...props.handlerProps} dense={true} >
                添加XYZ瓦片图层
            </MenuItem>
            <ToolDialog
                open={open}
                title="添加XYZ瓦片图层"
                onOK={handleOK}
                onCancel={handleCancel}
            >
                <Box component='div'>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="图层名称" value={inputName}
                                   margin="normal" fullWidth={true}
                                   onChange={handleInputNameChange}
                        />
                        <br/>
                        <TextField id="standard-basic" label="XYZ格式的URL" value={inputURL}
                                   margin="normal" fullWidth={true}
                                   onChange={handleInputURLChange}
                                   helperText="类似与http://address/{x}/{y}/{z}.png这样的格式。其中x，y代表瓦片行列号，z代表缩放级别"/>
                    </form>
                </Box>
            </ToolDialog>
        </>

    );

    function handleInputNameChange(e) {
        let inputName = e.target.value;
        setInputName(inputName);
    }

    function handleInputURLChange(e) {
        let inputURL = e.target.value;
        setInputURL(inputURL);
    }


    function onHandlerClick() {
        setOpen(true);
    }

    function handleOK() {
        let layer = LAYERS.makeXYZLayer(olmap, inputName, inputURL);
        olmap.addLayer(layer);
        LAYERS.zoomToLayer(olmap, layer.get('name'));
        setOpen(false);
    }

    function handleCancel() {
        setOpen(false);
    }
});

export default AddXYZTileLayerTool;