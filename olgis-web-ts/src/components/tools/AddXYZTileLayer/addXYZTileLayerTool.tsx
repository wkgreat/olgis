import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import ToolDialog from "../toolDialog";
import TextField from "@material-ui/core/TextField";
import {MapContext} from "../../MapContext/mapContext";
import {LayerUtils} from "../../../olmap";
import BaseToolProps from "../baseToolProps";

interface AddXYZTileLayerToolPorps extends BaseToolProps{
}

const AddXYZTileLayerTool: React.FC<AddXYZTileLayerToolPorps> = (props) => {

    const olmap = React.useContext(MapContext);
    const [open, setOpen] = React.useState(Boolean(props.open));
    const [inputName, setInputName] = React.useState("OSM Black and White");
    const [inputURL, setInputURL] = React.useState("http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png");

    useEffect(()=>{
        setOpen(!!props.open)
    }, [props.open, props.signal]);

    return (
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
    );

    function handleInputNameChange(e:any) {
        let inputName = e.target.value;
        setInputName(inputName);
    }

    function handleInputURLChange(e:any) {
        let inputURL = e.target.value;
        setInputURL(inputURL);
    }


    // function onHandlerClick() {
    //     setOpen(true);
    // }

    function handleOK() {
        let layer = LayerUtils.makeXYZLayer(olmap, inputName, inputURL);
        LayerUtils.addLayer(olmap, layer);
        LayerUtils.zoomToLayer(olmap, layer.get('name'));
        setOpen(false);
    }

    function handleCancel() {
        setOpen(false);
    }

};

export default AddXYZTileLayerTool;
