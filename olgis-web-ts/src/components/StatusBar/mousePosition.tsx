import React, {FC, useContext, useEffect, useState} from "react";
import {MapContext} from "../MapContext/mapContext";
import {ProjectionLike} from "ol/proj";
import {Box, BoxProps, Typography} from "@material-ui/core";
import useMousePosition, {MapMousePosition} from "../../hooks/useMousePosition";
import {CoordinateFormat, createStringXY} from "ol/coordinate";

/**
 * MousePosition组件属性
 * */
export interface MousePositionProps {
    /** 是否显示组件 */
    visible ?: boolean
    /** 组件box属性 */
    boxProps ?: BoxProps,
    /** 是否跟随鼠标 */
    followMouse ?: boolean,
    /** 坐标显示的坐标系 */
    projection ?: ProjectionLike,
    /** 坐标格式化函数 */
    coordinateFormat ?: CoordinateFormat
}

/**
 * React组件: 显示当前地图上鼠标位置坐标
 * @function
 * */
const MousePosition: FC<MousePositionProps> = ({visible, projection, followMouse, boxProps, coordinateFormat}) => {

    const map = useContext(MapContext);

    const pos: MapMousePosition = useMousePosition(map, projection || "EPSG:4326");

    const [vis, setvis] = useState(!!visible);

    useEffect(()=>{
        setvis(!!visible);
    }, [visible]);

    const formatter: CoordinateFormat = coordinateFormat || createStringXY(4);

    const getBoxProps = () => {
        if(vis && followMouse && pos) {
            return {
                p: 0.5,
                mx: 1,
                my: "auto",
                border: 1,
                position: "absolute",
                left: pos[1][0],
                top: pos[1][1],
                bgcolor: "rgba(0,0,0,0.5)"
            }
        } else {
            return {
                p: 0.2,
                mx: 0.5,
                my: "auto",
                bgcolor: "rgba(0,0,0,1)",
                borderRadius: 4
            }
        }
    };

    if(vis) {
        return <Box {...getBoxProps()}>
            <Typography variant="caption" display="block">
                {`Mouse Position: ${pos ? formatter(pos[0]) : "Unknown"}`}
            </Typography>
        </Box>
    } else {
        return <></>;
    }
};

export default MousePosition;
