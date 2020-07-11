import React, {FC, useContext, useEffect, useState} from "react";
import BaseToolProps from "../baseToolProps";
import ToolDialog from "../toolDialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import {TextareaAutosize} from "@material-ui/core";
import {MapContext} from "../../MapContext/mapContext";
import {parseCSVText} from "../../../olmap/format/CSVData";
import {makeCSVPointsLayer} from "../../../olmap/olmapLayer";
import {LayerUtils} from "../../../olmap";

export interface AddCSVPointsLayerProps extends BaseToolProps{
}

/**
 * 参数：
 * layerName 图层名称
 * csv csv数据
 * xField
 * yField
 * zField
 * mField
 * tField
 * header
 * delimiter
 *
 * */
const AddCSVPointsLayer: FC<AddCSVPointsLayerProps> = (props) => {

    const [open, setOpen] = useState(props.open);
    const [layerName, setLayerName] = useState("csv-layer");
    const [csv, setCSV] = useState(`C0,C1,C2
    117,32,0
    117.5, 32.5, 1
    118, 33, 2
    `);
    const [xField, setXField] = useState("C0");
    const [yField, setYField] = useState("C1");
    const [header, setHeader] = useState(true);
    const [delimiter, setDelimiter] = useState(",");
    //TODO other setting

    const olmap = useContext(MapContext);

    useEffect(()=>{
        setOpen(props.open)
    }, [props.open, props.signal]);

    function handleLayerNameChange(e:any) {
        let inputName = e.target.value;
        setLayerName(inputName);
    }

    function handleCSVChange(e:any) {
        let v = e.target.value;
        setCSV(v);
    }

    const handleOK = ()=> {
        props.onOK && props.onOK();
        addLayer();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const addLayer = () => {
        const csvData = parseCSVText(csv, header, delimiter);
        const layer = makeCSVPointsLayer(olmap, layerName, csvData, xField, yField);
        if(layer) {
            LayerUtils.addLayer(olmap, layer);
            LayerUtils.zoomToLayer(olmap, layer.get("name"));
        }
    };

    if(open) {

        return (
            <ToolDialog
                open={open}
                title="添加CSV点图层"
                onOK={handleOK}
                onCancel={handleCancel}
            >
                <Box component='div'>
                    现在只支持WGS84坐标
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="图层名称" value={layerName}
                                   margin="normal" fullWidth={true}
                                   onChange={handleLayerNameChange}
                        />
                        <br/>
                        <TextField id="standard-basic" label="X字段名称" value={xField}
                                   margin="normal" fullWidth={true}
                                   onChange={(e)=>{setXField(e.target.value)}}
                        />
                        <TextField id="standard-basic" label="Y字段名称" value={yField}
                                   margin="normal" fullWidth={true}
                                   onChange={(e)=>{setYField(e.target.value)}}
                        />
                        <br/>
                        CSV文本:
                        <br/>
                        <TextareaAutosize id="standard-basic"
                                          rowsMax={20}
                                          value={csv}
                                          onChange={handleCSVChange}
                                          style={{
                                              width: "100%",
                                              maxWidth: "100%"
                                          }}
                        />
                    </form>
                </Box>
            </ToolDialog>
        )

    } else return (<></>)

};

export default AddCSVPointsLayer;