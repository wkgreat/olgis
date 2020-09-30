import {CSVData} from "./CSVData";

export class TableData {
    private _columns : Column[] = [];
    private _rows : Row[] = [];

    get columns(): Column[] {
        return this._columns;
    }

    set columns(value: Column[]) {
        this._columns = value;
    }

    get rows(): Row[] {
        return this._rows;
    }

    set rows(value: Row[]) {
        this._rows = value;
    }

    setType(dataKey:string, type: any) {
        const column = this._columns.find((value)=>value.dataKey===dataKey);
        if(column) {
            column.type = type;
        }
    }

    static fromCSV(csvData?: CSVData|null): TableData|null {

        if(!csvData) {
            return null;
        }

        const tableData = new TableData();
        tableData.columns = csvData.columnNames.map(cn=>({
            dataKey:cn,
            label:cn,
            numeric: false,
            width:100
        }));
        tableData.rows = csvData.rows.map(row=>{
            let rowObj:Row = {};
            for(let i in csvData.columnNames) {
                const dk = csvData.columnNames[i];
                rowObj[dk] = {
                    dataKey: dk,
                    value: row[i]
                };
            }
            return rowObj;
        });
        return tableData;
    }
}

export interface Column {
    dataKey : string
    label ?: string
    type ?: any
    numeric ?: boolean
    width : number
}

export interface Row {
    [datakey: string]: Cell
}

export interface Cell {
    dataKey : string
    value : any,
    data ?: any
}