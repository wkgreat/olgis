import React, {FC, useContext, useEffect, useState} from "react";
import BaseToolProps from "../baseToolProps";
import ToolDialog from "../toolDialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import {FormControl, InputLabel, MenuItem, Paper, Select, TextareaAutosize} from "@material-ui/core";
import {MapContext} from "../../MapContext/mapContext";
import {parseCSVText} from "../../../olmap/format/CSVData";
import {makeCSVPointsLayer} from "../../../olmap/olmapLayer";
import {LayerUtils} from "../../../olmap";
import DataTable from "../../common/dataTable";
import {TableData} from "../../../olmap/format/TableData";

export interface AddCSVPointsLayerProps extends BaseToolProps{
}

const defaultCSV:string =
`LAT, LON, CITY, NUMBER
46.066667, 11.116667, Trento, 140
44.9441, -93.0852, St Paul, 125
13.752222, 100.493889, Bangkok, 150
45.420833, -75.69, Ottawa, 200
44.9801, -93.251867, Minneapolis, 350
46.519833, 6.6335, Lausanne, 560
48.428611, -123.365556, Victoria, 721
-33.925278, 18.423889, Cape Town, 550
-33.859972, 151.211111, Sydney, 436
41.383333, 2.183333, Barcelona, 914
39.739167, -104.984722, Denver, 869
52.95, -1.133333, Nottingham, 800
45.52, -122.681944, Portland, 840
37.5667,129.681944,Seoul,473
50.733992,7.099814,Bonn,700`;

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
    const [csv, setCSV] = useState(defaultCSV);
    const [xField, setXField] = useState("");
    const [yField, setYField] = useState("");
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

    function getTableDataFromCsvText(csvText: string):TableData|undefined|null {
        if(csvText) {
            const csvData = parseCSVText(csvText, header, delimiter);
            const tdata = TableData.fromCSV(csvData);
            return tdata;
        } else {
            const tdata = new TableData();
            return tdata;
        }

    }

    function handleCSVChange(e:any) {
        let v = e.target.value;
        setCSV(v);
        const tdata = getTableDataFromCsvText(v);
        setTableData(tdata);
    }

    const handleOK = ()=> {
        props.onOK && props.onOK();
        addLayer();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const validateXField = (): boolean => {
        return !!tableData && tableData.columns.map(c=>c.dataKey).includes(xField);
    };

    const validateYField = (): boolean => {
        return !!tableData && tableData.columns.map(c=>c.dataKey).includes(yField);
    };

    const changeXField = (e:any) => setXField(()=>e.target.value);
    const changeYField = (e:any) => setYField(()=>e.target.value);

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
                enableOK={validateXField()&&validateYField()}
            >
                <Box component='div'>
                    现在只支持WGS84坐标
                    <form noValidate autoComplete="off">
                        <Box mx={1}>
                            <TextField
                                variant="filled"
                                id="standard-basic"
                                label="图层名称" value={layerName}
                                margin="normal" fullWidth={true}
                                onChange={handleLayerNameChange}
                            />
                        </Box>
                        <br/>
                        <Box display="flex">
                            <Box width="50%" mx={1}>
                                <FormControl fullWidth={true} size="small" error={!validateXField()}>
                                    <InputLabel>X字段</InputLabel>
                                    <Select
                                        displayEmpty={true}
                                        variant="filled"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={xField}
                                        onChange={changeXField}
                                        disabled={!tableData || tableData.isEmpty()}
                                    >
                                        {
                                            tableData ?
                                                tableData.columns.map(c=><MenuItem key={c.dataKey} value={c.dataKey}>{c.label}</MenuItem>)
                                                : <MenuItem key="EMPTY" value="">EMPTY</MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box width="50%" mx={1}>
                                <FormControl fullWidth={true} size="small" error={!validateYField()}>
                                    <InputLabel>Y字段</InputLabel>
                                    <Select
                                        displayEmpty={true}
                                        variant="filled"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={yField}
                                        onChange={changeYField}
                                        disabled={!tableData || tableData.isEmpty()}
                                    >
                                        {
                                            tableData ?
                                                tableData.columns.map(c=><MenuItem key={c.dataKey} value={c.dataKey}>{c.label}</MenuItem>)
                                                : <MenuItem key="EMPTY" value="">EMPTY</MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
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
                            <Paper style={{ height: tableData.rows.length*24+24, maxHeight: 250, width: '100%', overflowX: 'auto'}}>
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
