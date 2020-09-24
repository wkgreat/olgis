import React from 'react';
import {storiesOf} from "@storybook/react";
import DataTable, {FieldData} from "../../common/dataTable";
import ReactVirtualizedTable from "../../common/demoTable";
import {Paper} from "@material-ui/core";

const columns: FieldData[] = [
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

const rows: [string,string,number,number][] = [
    ["刘备","荆州", 117, 32],
    ["张飞","徐州", 118, 33],
    ["关羽","赤壁", 119, 34],
    ["袁绍","洛阳", 120, 35],
    ["曹操","官渡", 121, 36],
    ["刘备","荆州", 117, 32],
    ["张飞","徐州", 118, 33],
    ["关羽","赤壁", 119, 34],
    ["袁绍","洛阳", 120, 35],
    ["曹操","官渡", 121, 36],
    ["刘备","荆州", 117, 32],
    ["张飞","徐州", 118, 33],
    ["关羽","赤壁", 119, 34],
    ["袁绍","洛阳", 120, 35],
    ["曹操","官渡", 121, 36],
    ["刘备","荆州", 117, 32],
    ["张飞","徐州", 118, 33],
    ["关羽","赤壁", 119, 34],
    ["袁绍","洛阳", 120, 35],
    ["曹操","官渡", 121, 36]
];

const data = rows.map(r=>(
    {
        "name": r[0],
        "addr": r[1],
        "lon": r[2],
        "lat": r[3]
    }
));

storiesOf("Attribute Table", module)
    .add("Demo Table", ()=><ReactVirtualizedTable/>)
    .add("Attribute Table", ()=>(
        <Paper style={{ height: 400, width: '100%' }}>
            <DataTable
                columns={columns}
                headerHeight={48}
                rowHeight={48}
                rowCount={rows.length}
                rowGetter={({index}) => data[index]}
            />
        </Paper>

    ));