import React from 'react';
import {storiesOf} from "@storybook/react";
import DataTable from './dataTable';
import {TableData} from '../../olmap/format/TableData';

const tableData = new TableData();
tableData.columns = [
    {dataKey:'id', label: '编号', width: 100},
    {dataKey:'name', label: '姓名', width: 100},
    {dataKey:'age', label: '年龄', width: 100},
    {dataKey:'address',label: '地址', width: 100},
    {dataKey:'lon',label: '经度', width: 100, numeric:true},
    {dataKey:'lat',label: '纬度', width: 100, numeric:true},
];
tableData.rows = [
    {
        id: {dataKey: "id", value: "1"},
        name: {dataKey: "name", value: "刘备"},
        age: {dataKey: "age", value: "53"},
        address: {dataKey: "address", value: "成都"},
        lon: {dataKey: "lon", value: 117},
        lat: {dataKey: "lat", value: 32},
    },
    {
        id: {dataKey: "id", value: "2"},
        name: {dataKey: "name", value: "刘备"},
        age: {dataKey: "age", value: "53"},
        address: {dataKey: "address", value: "成都"},
        lon: {dataKey: "lon", value: 117},
        lat: {dataKey: "lat", value: 32},
    },
    {
        id: {dataKey: "id", value: "3"},
        name: {dataKey: "name", value: "刘备"},
        age: {dataKey: "age", value: "53"},
        address: {dataKey: "address", value: "成都"},
        lon: {dataKey: "lon", value: 117},
        lat: {dataKey: "lat", value: 32},
    },
    {
        id: {dataKey: "id", value: "4"},
        name: {dataKey: "name", value: "刘备"},
        age: {dataKey: "age", value: "53"},
        address: {dataKey: "address", value: "成都"},
        lon: {dataKey: "lon", value: 117},
        lat: {dataKey: "lat", value: 32},
    },
];

storiesOf('DataTable', module).add("DataTable", ()=>(
    <DataTable
        tableData = {tableData}
        headerHeight = {24}
        rowHeight = {24}
    />
));
