

let rangeArray = (start:number, end:number) => Array(end - start + 1).fill(0).map((v, i) => i + start);

/**
 * TODO 1: 添加CSV校验
 * TODO 2: 改成异步函数
 * TODO 3: 字段类型功能
 * */

export interface CSVData {
    columnNames: string[],
    rows: any[][],
    header : boolean,
    delimiter : string
}

export const parseCSVText = (text : string, header : boolean = false, delimiter : string = ','): CSVData => {

    let columnNames;
    let rows;

    let allRows = text
        .split("\n")
        .map(s=>s.trim())
        .filter(s => s != null && s.length > 0);

    if(header) {
        columnNames = allRows[0].split(delimiter).map(s=>s.trim())
    }
    rows = allRows.slice(1).map(r=>r.split(delimiter).map(s=>s.trim()));
    let numCols = Math.max(...rows.map(r=>r.length));

    if(!columnNames) {
        columnNames = rangeArray(0,numCols).map(n=>`C${n}`);
    }

    return {
        columnNames,
        rows,
        header,
        delimiter
    }

};