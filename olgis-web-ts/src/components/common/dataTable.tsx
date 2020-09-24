import React, {FC} from 'react';
import clsx from 'clsx';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import {AutoSizer, Column, Index, Table, TableCellRenderer, TableHeaderProps} from 'react-virtualized';

declare module '@material-ui/core/styles/withStyles' {
    // Augment the BaseCSSProperties so that we can control jss-rtl
    interface BaseCSSProperties {
        /*
         * Used to control if the rule-set should be affected by rtl transformation
         */
        flip?: boolean;
    }
}

const styles = (theme: Theme) =>
    createStyles({
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
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
                backgroundColor: theme.palette.grey[200],
            },
        },
        tableCell: {
            flex: 1,
        },
        noClick: {
            cursor: 'initial',
        },
    });

export type RowData = {[datakey:string]: any}

/** 字段属性 */
export interface FieldData {
    dataKey: string;
    label: string;
    numeric?: boolean;
    width: number;
}

export interface DataTableProps extends WithStyles<typeof styles>{
    columns : FieldData[]
    headerHeight ?: number
    rowHeight : number
    rowCount : number
    onRowClick?: () => void;
    rowGetter?: (info: Index) => RowData;
}

const BaseDataTable: FC<DataTableProps> = (props) => {

    const { classes, columns, rowHeight, headerHeight, ...tableProps } = props;
    
    const getRowClassName = ({ index }: any) => {
        const { classes, onRowClick } = props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    const cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    const headerRenderer = ({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) => {
        const { headerHeight, columns, classes } = props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    
    return (
        <AutoSizer>
            {({ height, width }) => (
                <Table
                    height={height}
                    width={width}
                    rowHeight={rowHeight!}
                    gridStyle={{
                        direction: 'inherit',
                    }}
                    headerHeight={headerHeight!}
                    className={classes.table}
                    {...tableProps}
                    rowClassName={getRowClassName}
                >
                    {columns.map(({ dataKey, ...other }, index) => {
                        return (
                            <Column
                                key={dataKey}
                                headerRenderer={(headerProps) =>
                                    headerRenderer({
                                        ...headerProps,
                                        columnIndex: index,
                                    })
                                }
                                className={classes.flexContainer}
                                cellRenderer={cellRenderer}
                                dataKey={dataKey}
                                {...other}
                            />
                        );
                    })}
                </Table>
            )}
        </AutoSizer>
    );
};

const DataTable = withStyles(styles)(BaseDataTable);
export default DataTable;

