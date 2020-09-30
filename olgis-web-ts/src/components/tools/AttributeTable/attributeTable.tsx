import VectorLayer from "ol/layer/Vector";
import React, {FC, useEffect, useState} from "react";
import DataTable from "../../common/dataTable";
import {Column, Row, TableData} from "../../../olmap/format/TableData";
import ToolDialog from "../toolDialog";
import BaseToolProps from "../baseToolProps";
import {Geometry} from "ol/geom";

export interface AttributeTableProps extends BaseToolProps{

    layer ?: VectorLayer

}

const getTableDataFromLayer = (layer?:VectorLayer): TableData => {

    const tableData = new TableData();
    if(!layer) {
        return tableData;
    } else {

        const fs = layer.getSource().getFeatures();
        const dataKeys:string[] = [];
        const columns: Column[] = [];
        const rows: Row[] = [];
        for(let f of fs) {
            const row: Row = {};
            const p = f.getProperties() as { [key: string]: any };
            for(let pp in p) {
                if(!(dataKeys.includes(pp))) {
                    columns.push({
                        dataKey: pp,
                        label: pp,
                        width: 200
                    });
                    dataKeys.push(pp);
                }
                let value:any = f.get(pp);
                if(value instanceof Geometry) {
                    value = JSON.stringify(value);
                } else {
                    value = `${value}`
                }
                row[pp] = {
                    dataKey: pp,
                    value: value
                }
            }
            rows.push(row);
        }
        tableData.columns = columns;
        tableData.rows = rows;
        return tableData;
    }

};

const AttributeTable: FC<AttributeTableProps> = (props) => {

    const {layer} = props;

    const [open, setOpen] = useState<boolean>(!!props.open);

    useEffect(()=>{
        setOpen(!!props.open);
    }, [props.signal, props.open]);

    return (
        <ToolDialog
            title="属性表"
            open={open}
            onOK={()=>{setOpen(false)}}
            onCancel={()=>{setOpen(false)}}
        >
            <DataTable
                tableData = {getTableDataFromLayer(layer)}
                rowHeight = {24}
                headerHeight = {24}
            />
        </ToolDialog>
    )

};

export default AttributeTable;