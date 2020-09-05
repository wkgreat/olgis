import BaseToolProps from "../baseToolProps";
import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {MapContext} from "../../MapContext/mapContext";
import ToolDialog from "../toolDialog";
import Measure, {
    MeasureOptions,
    MeasureResult,
    MeasureType,
    Units,
    unitsOfMeasureType
} from "../../../olmap/interaction/Measure";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {LayerUtils} from "../../../olmap";
import {
    Box,
    Button,
    createStyles,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface MeasureToolProps extends BaseToolProps{
}

const useDialogStyles = makeStyles((theme: Theme) => ({

    root: {
        backgroundColor: "transparent",
        pointerEvents: "none"
    },
    paper: {
        pointerEvents: "auto",
        position: "absolute",
        top: 0,
        right:0,
        backgroundColor: "rgba(0,0,0,0.9)",
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.9)"
    },
    title: {
        backgroundColor: "black",
    }

}));

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        }
    }),
);
/**
 * 地图测量工具
 * TODO 磁方位角测量
 * TODO 调整对话框大小，对话框标题栏大小
 * TODO 解决徒手画的问题
 * TODO 增加吸附功能
 * TODO 增加修改已测要素功能
 * TODO 增加选择其他图层要素测量功能
 * */
const MeasureTool: FC<MeasureToolProps> = (props) => {

    const classes = useStyles();
    const dialogClasses = useDialogStyles();

    const olmap = useContext(MapContext);
    const [open, setOpen] = useState(!!props.open);
    const [measureType, setMeasureType] = useState<MeasureType>("line");
    const [unit, setUnit] = useState<Units>(Units.METER);
    const [result, setResult] = useState<MeasureResult|undefined>(undefined);
    const [refline, setRefline] = useState<boolean>(true);
    const [freehand, setFreehand] = useState<boolean>(false);

    const measure = useRef<Measure|undefined>(undefined);
    const layer = useRef<VectorLayer|undefined>(undefined);

    const setMeasure = (theMeasureType:MeasureType=measureType, theUnit:Units=unit, measureOptions?: Partial<MeasureOptions>) => {
        if(open && !measure.current) {
            const source = new VectorSource();
            const theLayer = new VectorLayer({
                source
            });
            theLayer.set("name", "measure");
            const theMeasure = new Measure({
                source,
                measureType : theMeasureType,
                unit: theUnit,
                freehand,
                refline,
                measureCallback: (res) => {
                    setResult(res);
                },
                ...measureOptions
            });
            measure.current = theMeasure;
            layer.current = theLayer;

            olmap.addInteraction(theMeasure);
            olmap.addLayer(theLayer);
            olmap.getTargetElement().style.cursor="crosshair";
        }
    };

    const changeMeasure = (measureType: MeasureType, unit: Units, measureOptions ?: Partial<MeasureOptions>) => {
        if(measure.current) {
            olmap.removeInteraction(measure.current);
            measure.current = undefined
        }
        if(layer.current) {
            LayerUtils.removeLayerByName(olmap, layer.current.get("name"));
            layer.current = undefined
        }
        setMeasure(measureType, unit, measureOptions)
    };

    useEffect(()=>{
        console.log("MeasureTool useEffect 1");
        setMeasure();
    });

    useEffect(()=>{
        console.log("MeasureTool useEffect 2");
        setOpen(!!props.open);
        setMeasure();
    }, [props.open, props.signal]);

    const closeTool = () => {
        if(measure.current && layer.current) {
            olmap.removeInteraction(measure.current);
            LayerUtils.removeLayerByName(olmap,layer.current.get("name"));
            measure.current = undefined;
            layer.current = undefined;
            olmap.getTargetElement().style.cursor="auto";
        }
        setResult(undefined);
        setOpen(false);
    };

    const resolveResult = (res?:MeasureResult) => {
        if(res) {
            return (
                <Grid container zeroMinWidth={true}>
                    <Grid item xs={6}>
                        <Typography variant="body1">测量类型(MeasureType):</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{res?.measureType}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">测量值(Value):</Typography></Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{res?.value}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">单位(Unit):</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{res?.unit}</Typography>
                    </Grid>
                </Grid>
            )
        } else {
            return <></>
        }
    };

    function onMeasureTypeChange(e:any) {
        const mt = e.target.value as MeasureType;
        const ut = unitsOfMeasureType(mt)[0];
        setMeasureType(mt);
        setUnit(ut);
        setResult(undefined);
        changeMeasure(mt,ut);
    }

    function onUnitChange(e:any) {
        const ut = e.target.value as Units;
        setUnit(ut);
        setResult(undefined);
        changeMeasure(measureType, ut);
    }

    function onClear(e:any) {
        if(layer.current) {
            layer.current.getSource().clear();
            setResult(undefined);
        }
    }

    function canFreeHand() {
        const b = measureType==="line" || measureType==="path" || measureType==="area" ;
        return b;
    }

    function onFreeHandChange(e:any, fh: boolean) {
        setFreehand(fh);
        changeMeasure(measureType, unit, {
            freehand: fh,
            refline
        })
    }

    function onReflineChange(e:any, rf: boolean) {
        setRefline(rf);
        changeMeasure(measureType, unit, {
            freehand,
            refline: rf
        })
    }

    const units = unitsOfMeasureType(measureType);

    return (
        <ToolDialog
            classes={dialogClasses}
            title="测量工具"
            open={open}
            onOK={closeTool}
            onCancel={closeTool}
        >
            <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="measureTool-measureType-inputLabel">测量类型</InputLabel>
                        <Select
                            labelId="measureTool-measureType-select-label"
                            id="measureTool-measureType-select"
                            value={measureType}
                            onChange={onMeasureTypeChange}
                        >
                            <MenuItem value={"line"}>Line(线段长度)</MenuItem>
                            <MenuItem value={"path"}>Path(多段线长度)</MenuItem>
                            <MenuItem value={"area"}>Area(多边形面积)</MenuItem>
                            <MenuItem value={"angle"}>Angle(两线夹角)</MenuItem>
                            <MenuItem value={"true_azimuth"}>True Azimuth(真方位角)</MenuItem>
                            <MenuItem disabled={true} value={"magnetic_azimuth"}>Magnetic Azimuth(磁方位角)</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="measureTool-unit-inputLabel">测量单位</InputLabel>
                        <Select
                            labelId="measureTool-unit-label"
                            id="measureTool-unit-select"
                            value={unit}
                            onChange={onUnitChange}
                        >
                            {
                                units.map(m=>(
                                    <MenuItem value={m}>{m}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                {/*<Box>*/}
                {/*    <InputLabel disableAnimation={true} id="measureTool-freehead-inoutlabel">是否徒手画(Freehand)</InputLabel>*/}
                {/*    <Switch disabled={!canFreeHand()} checked={freehand}*/}
                {/*            onChange={onFreeHandChange}/>*/}
                {/*</Box>*/}
                <Box>
                    <InputLabel disableAnimation={true} id="measureTool-refline-inoutlabel">参照线</InputLabel>
                    <Switch checked={refline} onChange={onReflineChange}/>
                </Box>
                <Box>
                    <Button size="small" variant="outlined" onClick={onClear}>清除已测结果</Button>
                </Box>
            </Box>
            <Box>
                {resolveResult(result)}
            </Box>
        </ToolDialog>
    );

};

export default MeasureTool;