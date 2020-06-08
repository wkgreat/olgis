import React, {CSSProperties, useContext, useEffect} from "react";
import OlMap from "../../olmap/olMap";
import {MapContext} from "../MapContext/mapContext";

type MapType = "box" | "full";

export interface BaseMapProps {

    /** Map对象的div容器id号 */
    id?: string;
    /** Map背景色，当无图层或者图层透明时显示*/
    bgColor?: string,
    /** div的class */
    className ?: string,
    /** Map的布局类型 */
    mapType?: MapType,
    /** div的样式*/
    style ?: CSSProperties
}

type MapProps = BaseMapProps

export const OLMap: React.FC<MapProps> = ({id, bgColor, mapType, className, style}) => {

    const olmap: OlMap|undefined = useContext(MapContext);

    const mapDivResizeFunc = () => {

        console.log("Map mapDivResizeFunc");

        if(id && mapType==="full") {
            let mapDiv = document.getElementById(id);
            if(mapDiv) {
                mapDiv.style.height = window.innerHeight + "px";
            }
        }
    };


    useEffect(()=>{

        console.log("Map UseEffect");

        document.body.onload = mapDivResizeFunc;
        document.body.onresize = mapDivResizeFunc;
        document.body.onchange = mapDivResizeFunc;

        if(olmap) {
            olmap.setTarget(id);
            setTimeout(()=>{
                olmap.render();
                olmap.updateSize();
            },1000);
        }


    }, []);

    const refresh = () => {
        console.log("Map Refresh")
        if(olmap) {
            olmap.render();
            olmap.updateSize();
        }
    };

    const handleDivLoad = (event:React.SyntheticEvent<HTMLDivElement,Event>) => {

        console.log("map handleDivLoad")

        if(mapType==="full") {
            event.preventDefault();
            const div = event.currentTarget as HTMLDivElement;
            div.style.height = window.innerHeight + "px";
        }

    };

    const handleDivChange = (event:React.SyntheticEvent<HTMLDivElement,Event>) => {

        console.log("map handleDivChange")

        if(mapType==="full") {
            event.preventDefault();
            const div = event.currentTarget as HTMLDivElement;
            div.style.height = window.innerHeight + "px";
            refresh();
        }

    };

    const makeStyle = () => {
        let theStyle = style || {};
        theStyle.backgroundColor = bgColor;
        if(mapType==="full") {
            theStyle.height = window.innerHeight;
        }
        return theStyle;
    };

    return (
        <div
            id={id}
            className={className}
            onLoad={handleDivLoad}
            onChange={handleDivChange}
            style={makeStyle()}
        />
    )
};

OLMap.defaultProps = {
    id: 'ol-map-div',
    bgColor: '#040508',
    mapType: "full"
};

export default OLMap;