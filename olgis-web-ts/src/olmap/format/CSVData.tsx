

let rangeArray = (start:number, end:number) => Array(end - start + 1).fill(0).map((v, i) => i + start);

/**
 * TODO 1: 添加CSV校验
 * TODO 2: 改成异步函数
 * TODO 3: 字段类型功能
 * */

export interface CSVData {
    /**
     * 字段名称
     * */
    columnNames: string[],

    /**
     * 行数据
     * */
    rows: any[][],

    /**
     * 第一行是否字段名称
     * */
    header : boolean,

    /**
     * 字段分割符，一般为逗号
     * */
    delimiter : string,

    /**
     * 列数
     * */
    numCols : number
}

export const parseCSVText = (text : string, header : boolean = false, delimiter : string = ','): CSVData|null => {

    let columnNames;
    let rows;

    try {
        let allRows = text.trim()
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

        const csvData = {
            columnNames,
            rows,
            header,
            delimiter,
            numCols
        };

        return csvData;

    } catch (e) {
        console.warn(e);
    }

    return null;


};