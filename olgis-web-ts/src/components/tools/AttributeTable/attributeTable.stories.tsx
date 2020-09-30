import React from 'react';
import {storiesOf} from "@storybook/react";
import DataTable from "../../common/dataTable";
import ReactVirtualizedTable from "../../common/demoTable";
import {Paper} from "@material-ui/core";
import {TableData} from "../../../olmap/format/TableData";

const tableData = new TableData();
tableData.columns = [
    {
        dataKey: "name",
        label: "姓名",
        numeric: false,
        width: 200
    },
    {
        dataKey: "addr",
        label: "地点",
        numeric: false,
        width: 200
    },
    {
        dataKey: "lon",
        label: "经度",
        numeric: true,
        width: 200
    },
    {
        dataKey: "lat",
        label: "维度",
        numeric: true,
        width: 200
    }
];

tableData.rows = [
    {
        name: {dataKey: "name", value: "刘备"},
        addr: {dataKey: "addr", value: "荆州"},
        lon: {dataKey: "lon", value: "117"},
        lat: {dataKey: "lat", value: "32"}
    },
    {
        name: {dataKey: "name", value: "张飞"},
        addr: {dataKey: "addr", value: "荆州"},
        lon: {dataKey: "lon", value: "117"},
        lat: {dataKey: "lat", value: "39"}
    },
];

storiesOf("Attribute Table", module)
    .add("Demo Table", ()=><ReactVirtualizedTable/>)
    .add("Attribute Table", ()=>(
        <Paper style={{ height: 400, width: '100%' }}>
            <DataTable
                tableData = {tableData}
                headerHeight={36}
                rowHeight={36}
            />
        </Paper>

    ));