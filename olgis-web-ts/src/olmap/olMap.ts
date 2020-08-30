import {MapOptions} from 'ol/PluggableMap'
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {Map, View} from "ol";
import {fromLonLat, ProjectionLike, transformExtent} from "ol/proj";
import {ScaleLine} from "ol/control";
import {Options} from 'ol/control/ScaleLine'
import {Extent} from "ol/extent";

/**
 * 获取地图当前可视范围
 * @function
 * @param map 地图对象
 * @param proj 返回范围的坐标系
 * @returns 范围
 * */
export function getCurrentViewExtent(map: OlMap, proj?:ProjectionLike):Extent {
    const extent = map.getView().calculateExtent(map.getSize());
    if(proj) {
        return transformExtent(extent, map.getView().getProjection(), proj);
    } else {
        return extent;
    }
}


export interface OlMapOptions extends MapOptions{

    /** 是否显示默认Controls */
    showDefaultControls ?: boolean
}

class OlMap extends Map {

    scaleLine: ScaleLine | null = null;

    constructor(options: OlMapOptions) {

        super(options);
        this.init(options);

    }

    init (options: OlMapOptions) {

        if(!options.showDefaultControls) {
            this.getControls().clear();
        }

        if(!options.layers) {
            //set OSM Layer
            const osmLayer = new TileLayer({
                source: new OSM()
            });
            osmLayer.set('name', 'osm', false);
            this.addLayer(osmLayer);
        }

        if(!options.view) {
            //set View
            const view = new View({
                center: fromLonLat([118.794315, 32.050167]),
                zoom: 10
            });
            this.setView(view);
        }

    }

    toggleScalaBar(visible:boolean, props: Options | undefined) {
        if (visible) {
            this.scaleLine = this.scaleLine || new ScaleLine(props);
            this.addControl(this.scaleLine);
        } else if (!visible && this.scaleLine) {
            this.removeControl(this.scaleLine);
        }
    }

    setScaleBar(visible: boolean, props: Options | undefined) {
        if (visible) {
            if(this.scaleLine) {
                this.removeControl(this.scaleLine);
            }
            this.scaleLine = new ScaleLine(props);
            this.addControl(this.scaleLine);
        }
    }

    getScaleBar(): ScaleLine|null {
        return this.scaleLine
    }

}

export default OlMap
