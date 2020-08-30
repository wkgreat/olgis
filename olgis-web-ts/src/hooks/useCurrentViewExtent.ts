import OlMap from "../olmap";
import {useEffect, useState} from "react";
import {ProjectionLike, transformExtent} from "ol/proj";
import {Extent} from "ol/extent";

/**
 * 获取当前地图可视范围
 * */
function useCurrentViewExtent(map: OlMap, proj ?: ProjectionLike): Extent {

    const getExtent = () => {
        const extent = map.getView().calculateExtent(map.getSize());
        return extent;
    };

    const [extent, setExtnet] = useState(getExtent());

    const callback = () => {
        const extent = getExtent();
        setExtnet(extent);
    };

    useEffect(()=>{

        map.getView().on("change", callback);

        return ()=>{
            map.getView().un("change", callback);
        }

    });

    if(proj) {
        return transformExtent(extent, map.getView().getProjection(), proj);
    } else {
        return extent;
    }

}

export default useCurrentViewExtent;
