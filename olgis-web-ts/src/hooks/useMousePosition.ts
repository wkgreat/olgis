import {Map} from 'ol';
import {default as PET} from 'ol/pointer/EventType';
import {useEffect, useState} from "react";
import {listen, unlistenByKey} from "ol/events";
import BaseEvent from "ol/events/Event";
import {getTransformFromProjections, getUserProjection, ProjectionLike, transform} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import {Pixel} from "ol/pixel";

export type MapMousePosition = [Coordinate, Pixel] | undefined;

/**
 * 自定义hook, 获取地图鼠标坐标
 * @param map 地图对象
 * @param proj 返回坐标的坐标系
 * @returns 坐标
 * */
function useMousePosition(map: Map, proj?:ProjectionLike) {

    const [pos, setPos] = useState<MapMousePosition>(undefined);

    useEffect(()=>{

        if(map) {

            const callback = (event: Event | BaseEvent) => {
                const pixel = map.getEventPixel(event as Event);
                let coord = map.getCoordinateFromPixelInternal(pixel);

                if(coord) {
                    const viewProjection = map.getView().getProjection();
                    const userProjection = getUserProjection();
                    if(userProjection) {
                        const userTransform = getTransformFromProjections(viewProjection, userProjection);
                        userTransform(coord, coord);
                    }
                    if(proj) {
                        coord = transform(coord, userProjection || viewProjection, proj);
                    }
                }

                setPos([coord, pixel]);
            };

            const key = listen(map.getViewport(), PET.POINTERMOVE, callback);

            return ()=>{
                unlistenByKey(key);
            }

        }

    });

    return pos;

}

export default useMousePosition;
