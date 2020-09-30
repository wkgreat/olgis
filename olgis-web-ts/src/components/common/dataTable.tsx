import React, {FC} from 'react';
import clsx from 'clsx';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import {Column, Index, Table, TableCellDataGetter, TableCellRenderer, TableHeaderProps} from 'react-virtualized';
import {TableData} from "../../olmap/format/TableData";

const styles = (theme: Theme) =>
    createStyles({
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box'
        },
        table: {
            // temporary right-to-left patch, waiting for
            // https://github.com/bvaughn/react-virtualized/issues/454
            '& .ReactVirtualized__Table__headerRow': {
                flip: false,
                paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
            },
        },
        tableRow: {
            cursor: 'pointer',
        },
        tableRowHover: {
            '&:hover': {
                backgroundColor: theme.palette.grey[800]
            },
        },
        tableColumnHover: {
            //backgroundColor: "red",
            '&:hover': {
                backgroundColor: theme.palette.grey[800]
            },
        },
        tableCell: {
            flex: 1,
            borderRight: "1px solid black",
            '&:hover': {
                backgroundColor: theme.palette.grey[900]
            },
        },
        noClick: {
            cursor: 'initial',
        },
        headerCell: {
            backgroundColor: theme.palette.type==='light' ? "rgba(255,255,255,0.5)" : "rgba(100,100,100,0.5)"
        },
        contentCell : {
            backgroundColor: theme.palette.type==='light' ? "rgba(200,200,200,0.5)" : "rgba(40,40,40,0.5)"
        }
    });

export interface DataTableProps extends WithStyles<typeof styles>{
    headerHeight : number
    rowHeight : number
    tableData : TableData;
    maxTableHeight ?:number;
    maxTableWidth ?:number;
    onRowClick?: () => void;
    //onDataCellClick?: (e:React.MouseEvent<HTMLTableDataCellElement, MouseEvent>)=>void;
}

const BaseDataTable: FC<DataTableProps> = (props) => {

    const { classes, tableData, rowHeight, headerHeight, maxTableHeight, maxTableWidth, ...tableProps } = props;
    
    const getRowClassName = ({ index }: any) => {
        const { classes } = props;
        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1
        });
    };

    //表头单元格
    const headerRenderer = ({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) => {

        const { headerHeight, classes, tableData} = props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick, classes.headerCell)}
                variant="head"
                style={{
                    height: headerHeight
                }}
                align={tableData.columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    //内容单元格
    const cellRenderer: TableCellRenderer = ({ cellData, columnIndex}) => {
        const { classes, rowHeight, tableData} = props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.contentCell)}
                variant="body"
                style={{
                    height: rowHeight
                }}
                align={(columnIndex != null && tableData.columns[columnIndex].numeric) || false ? 'right' : 'left'}
                // onClick={onDataCellClick}
                // onKeyDown={handleDataCellKeyDown}
                // onBlur={onDataCellBlur}
            >
                {cellData["value"]}
            </TableCell>
        );
    };

    const rowGetter = ({ index }: Index) => {
        return tableData.rows[index];
    };

    const cellDataGetter: TableCellDataGetter = ({columnData, dataKey, rowData}) => {
        return rowData[dataKey];
    };

    const getHeight = () => {
        const h = rowHeight*tableData.rows.length + (headerHeight);
        return !!maxTableHeight ? Math.min(h, maxTableHeight) : h;
    };

    const getWidth = () => {
        const w = tableData.columns.map(c=>c.width).reduce((x,y)=>x+y);
        return !!maxTableWidth ? Math.min(w, maxTableWidth) : w;
    };

    const onDataCellClick = (event:React.MouseEvent<HTMLTableDataCellElement, MouseEvent>)=>{
        const ele = event.target as HTMLTableDataCellElement;
        const oldChildren = ele.children;
        const value = ele.textContent;
        const input = document.createElement("input");
        input.textContent = "xxxxx";
        ele.textContent = "";
        input.defaultValue = value || "";
        if(oldChildren && oldChildren.length>0) {
            const ce = oldChildren.item(0);
            if(ce!=null) {
                ele.replaceChild(input, ce);
            } else {
                ele.appendChild(input);
            }
        } else {
            ele.appendChild(input);
        }
        ele.focus()
    };

    const handleDataCellKeyDown = (event: React.KeyboardEvent<HTMLTableDataCellElement>) => {
        console.log("key down");
        if(event.keyCode === 13) {
            console.log("blur");
            const ele = event.target as HTMLTableDataCellElement;
            const input = ele.children.item(0) as HTMLInputElement;
            console.log(input);
            const value = input.value;
            ele.removeChild(input);
            ele.textContent = value;
        }
    };

    const onDataCellBlur = (event: React.FocusEvent<HTMLTableDataCellElement>) => {
        console.log("blur");
        const ele = event.target as HTMLTableDataCellElement;
        const input = ele.children.item(0) as HTMLInputElement;
        console.log(input);
        const value = input.value;
        ele.removeChild(input);
        ele.textContent = value;
    };

    if(tableData.columns.length==0) {
        return <></>
    }

    return (
        <Table
            stickyHeader
            height={getHeight()}
            width={getWidth()}
            rowHeight={rowHeight!}
            headerHeight={headerHeight!}
            className={classes.table}
            rowClassName={getRowClassName}
            rowCount={tableData.rows.length}
            rowGetter={rowGetter}
            rowStyle={{
                width: getWidth(),
                border: "1px solid black"
            }}
            {...tableProps}
        >
            {tableData.columns.map(({ dataKey, ...other }, index) => {
                return (
                    <Column
                        key={dataKey}
                        headerRenderer={(headerProps) =>
                            headerRenderer({
                                ...headerProps,
                                columnIndex: index,
                            })
                        }
                        className={clsx(classes.flexContainer, classes.tableColumnHover)}
                        cellRenderer={cellRenderer}
                        cellDataGetter={cellDataGetter}
                        dataKey={dataKey}
                        {...other}
                    />
                );
            })}
        </Table>
    );
};

const DataTable = withStyles(styles)(BaseDataTable);
export default DataTable;

