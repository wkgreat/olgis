import React, {FC, useContext, useEffect, useState} from "react";
import BaseToolProps from "../baseToolProps";
import ToolDialog from "../toolDialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import {Paper, TextareaAutosize} from "@material-ui/core";
import {MapContext} from "../../MapContext/mapContext";
import {parseCSVText} from "../../../olmap/format/CSVData";
import {makeCSVPointsLayer} from "../../../olmap/olmapLayer";
import {LayerUtils} from "../../../olmap";
import DataTable from "../../common/dataTable";
import {TableData} from "../../../olmap/format/TableData";

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
    const [header] = useState(true);
    const [delimiter] = useState(",");
    //TODO other setting
    const [tableData, setTableData] = useState(getTableDataFromCsvText(csv));

    const olmap = useContext(MapContext);

    useEffect(()=>{
        setOpen(props.open)
    }, [props.open, props.signal]);

    function handleLayerNameChange(e:any) {
        let inputName = e.target.value;
        setLayerName(inputName);
    }

    function getTableDataFromCsvText(csvText: string) {
        const csvData = parseCSVText(csvText, header, delimiter);
        const tdata = TableData.fromCSV(csvData);
        return tdata;
    }

    function handleCSVChange(e:any) {
        let v = e.target.value;
        setCSV(v);
        const tdata = getTableDataFromCsvText(v);
        setTableData(tdata);
        console.log(v);
        console.log(tdata);
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
        if(csvData) {
            const layer = makeCSVPointsLayer(olmap, layerName, csvData, xField, yField);
            if(layer) {
                LayerUtils.addLayer(olmap, layer);
                LayerUtils.zoomToLayer(olmap, layer.get("name"));
            }
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
                        {!!tableData ?
                            <Paper style={{ height: tableData.rows.length*36+36, maxHeight: 250, width: '100%', overflowX: 'auto'}}>
                                <DataTable
                                    tableData = {tableData}
                                    headerHeight={24}
                                    rowHeight={24}
                                    maxTableHeight={200}
                                    maxTableWidth={100000}
                                />
                            </Paper>
                            :
                            <></>
                        }

                    </form>
                </Box>
            </ToolDialog>
        )

    } else return (<></>)

};

export default AddCSVPointsLayer;
