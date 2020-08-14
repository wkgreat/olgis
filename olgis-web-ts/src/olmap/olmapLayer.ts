/**
 * @file openlayers 地图接口
 */
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ImageLayer from "ol/layer/Image";
import {Group} from "ol/layer";
import * as STYLE from './olmapStyle';
import WKT from "ol/format/WKT";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTile from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import {createXYZ} from 'ol/tilegrid';

import mbStyle from './style.json';
import GeoJSON from "ol/format/GeoJSON";
import BaseLayer, {Options as BaseLayerOptions} from "ol/layer/Base";
import OlMapLayerEventType from './olMapLayerEventType'
import CSVPoints from "./format/CSVPoints";
import {CSVData, parseCSVText} from "./format/CSVData";

//layer编号生成器
export const layerIDGen = function* layerIdGenerator() {
    let id = 1;
    while (true) {
        yield id;
        id += 1;
    }
}();

/**
 * 生成图层唯一名称，要判断地图里面有没有重名的，如果有需要添加唯一编号
 * @param olmap 地图对象
 * @param name 要定义的图层名称
 * @returns 唯一的图层名称
 */
export const genLayerName = (olmap:Map, name:string):string => {
    name = name || "layer";
    const layersNames = olmap.getLayers().getArray().map(l => l.get('name'));
    return layersNames.includes(name) ? name + "_" + layerIDGen.next().value : name;
};

export const addLayer = (olmap: Map, layer: BaseLayer): void => {
    olmap.addLayer(layer);
    olmap.dispatchEvent(String(OlMapLayerEventType.LAYER_ADD));
};

/**
 * 使用提供的xyz瓦片的url生成图层
 * @param olmap 地图对象
 * @param name 图层名称
 * @param url 瓦片xyz的URL
 * @returns 瓦片图层对象
 */
export const makeXYZLayer = (olmap:Map, name:string, url:string) => {
    let layer = new TileLayer({
        source: new XYZ({
            url
        })
    });
    layer.set("name", genLayerName(olmap, name));
    return layer;
};
/**
 * 使用pbf的VectorTile瓦片 (MVT)
 * */
export const makeXYZVectorLayer = (olmap:Map, name:string, url:string) => {
    let theLayer = new VectorTileLayer({
        declutter: true,
        source: new VectorTile({
            format: new MVT(),
            tileGrid: createXYZ({maxZoom:17}),
            url
        })
    });
    theLayer.set("name", genLayerName(olmap, name));
    STYLE.applyMapboxStyleJson(theLayer,mbStyle,"composite");
    return theLayer;
};

/**
 * 获取地图中指定名称的图层对象
 */
export const findLayerByName = (olmap:Map, name:string) => {
    return olmap.getLayers().getArray().find(layer => layer.get('name') === name);
};

/**
 * 得到指定名字的图层index，相当于图层在地图中的顺序
 */
export const findLayerIndexByName = (olmap:Map, name:string) => {
    return olmap.getLayers().getArray().findIndex(layer => layer.get('name') === name);
};

/**
 * 删除指定名字的图层
 */
export const removeLayerByName = (olmap:Map, name:string) => {

    const layer = findLayerByName(olmap, name);
    if (layer) {
        olmap.removeLayer(layer);
        olmap.dispatchEvent(String(OlMapLayerEventType.LAYER_REMOVE))
    }

};

/**
 * 重命名图层
 */
export const renameLayer = (olmap:Map, name1:string, name2:string) => {

    const layer = findLayerByName(olmap, name1);
    if (layer && name2) {
        const newName = genLayerName(olmap, name2);
        layer.set("name", newName);
        olmap.dispatchEvent(String(OlMapLayerEventType.LAYER_RENAME))
    }

};

/**
 * 设置指定名字的图层的属性
 */
export const setLayerProps = (olmap:Map, name:string, props:{[key:string]:any}) => {
    const layer = findLayerByName(olmap, name);
    if (layer) {
        layer.setProperties(props);
        olmap.dispatchEvent(String(OlMapLayerEventType.LAYER_PROP_CHANGE));
    }
};

export const makeVectorLayer = (olmap:Map, name:string) => {
    let source = new VectorSource();
    const layer = new VectorLayer({
        source: source,
        style: STYLE.getDefaultStyle()
    });
    layer.set("name", genLayerName(olmap, name));
    return layer;
};

/**
 * make vector layer from csv data
 * @param olmap 地图对象
 * @param name 生成的图层名称
 * @param csv csv数据
 * @param {object} fieldIndex 地理字段信息
 * @example fieldIndex {'lon':1, 'lat':2, 'time':3} key为字段类型，value为第一个字段
 *
 */
export const makeCSVLayer = (olmap:Map, name:string, csv:string, fieldIndex:{[key:string]:number}) => {

    const features = csv
        .split("\n") //拆分行
        .slice(1) //去掉第一行
        .filter(s => s != null && s.length > 0) //去掉空行
        .map(r => {
            const values = r.split(",");
            const lon = Number(values[fieldIndex['lon']]);
            const lat = Number(values[fieldIndex['lat']]);
            const timeIndex = fieldIndex['time'];
            const time = (timeIndex < 0) ? '' : values[timeIndex];
            return new Feature({
                geometry: new Point(fromLonLat([lon, lat])),
                name: time
            });
        });

    const layer = new VectorLayer({
        source: new VectorSource({
            features
        }),
        style: STYLE.getDefaultStyle()
    });
    layer.set("name",genLayerName(olmap, name));
    return layer;


};

export const makeWKTLayer = (olmap:Map, name:string, wkts:string) => {
    let wktFormat = new WKT();
    wkts = wkts.trim();
    if (!wkts) {
        return null;
    }
    let features = wkts
        .split("\n")
        .filter(s => s != null && s.length > 0)
        .map(wkt =>
            wktFormat.readFeature(wkt, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            })
        );
    const layer =  new VectorLayer({
        source: new VectorSource({
            features
        }),
        style: STYLE.getDefaultStyle()
    });
    layer.set("name",genLayerName(olmap, name));
    return layer;
};

export const makeGeoJsonLayer = (olmap:Map, name:string, geojson:string): BaseLayer|null => {
    let geojsonFormat = new GeoJSON();
    geojson = geojson.trim();
    if(!geojson) {
        return null;
    }
    let features = geojsonFormat.readFeatures(geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    });
    const layer = new VectorLayer({
        source: new VectorSource({
            features
        }),
        style: STYLE.getDefaultStyle()
    });
    layer.set("name", genLayerName(olmap, name));
    return layer;
};

export const makeCSVPointsLayer = (olmap: Map, name:string, csv:CSVData,
                                   xField: string, yField: string, zField ?:string,
                                   mField?:string, tField?:string): BaseLayer | null => {
    let csvFormat = new CSVPoints();
    let features = csvFormat.readFeatures(csv, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
        x_field: xField,
        y_field: yField,
        z_field: zField,
        m_field: mField,
        t_field: tField
    });
    const layer = new VectorLayer({
        source: new VectorSource({
            features
        }),
        style: STYLE.getDefaultStyle()
    });
    layer.set("name", genLayerName(olmap, name));
    return layer;
};

/**
 * 图层上移一层
 * @param olmap 地图对象
 * @param name 要移动的图层名称
 */
export const layerUp = (olmap:Map, name:string) => {
    const layerIndex = findLayerIndexByName(olmap, name);
    const layerNums = olmap.getLayers().getLength();
    if (layerIndex !== -1 && layerIndex < layerNums - 1) {
        const theLayer = olmap.getLayers().item(layerIndex);
        olmap.removeLayer(theLayer);
        olmap.getLayers().insertAt(layerIndex + 1, theLayer);
        olmap.dispatchEvent(String(OlMapLayerEventType.LAYER_ORDER_CHANGE));
    }
};

/**
 * 图层下移一层
 * @param olmap 地图对象
 * @param name 要移动的图层名称
 */
export const layerDown = (olmap:Map, name:string) => {
    const layerIndex = findLayerIndexByName(olmap, name);
    if (layerIndex > 0) {
        const theLayer = olmap.getLayers().item(layerIndex);
        olmap.removeLayer(theLayer);
        olmap.getLayers().insertAt(layerIndex - 1, theLayer);
        olmap.dispatchEvent(String(OlMapLayerEventType.LAYER_ORDER_CHANGE));
    }
};

/**
 * 缩放至某图层
 * @param olmap 地图对象
 * @param name 缩放的目标图层
 */
export const zoomToLayer = (olmap:Map, name:string) => {
    const layer = findLayerByName(olmap, name);
    if (layer instanceof VectorLayer) {
        if (layer && layer.getSource()) {
            if (layer.getSource().getFeatures().length > 0) {
                olmap.getView().fit(layer.getSource().getExtent());
            }
        }

    }
};

/**
 * 获取图层类型
 * @param {ol.layer} layer 图层对象
 * @returns {string} 图层类型的字符串表示
 */
export const getLayerType = (layer:BaseLayer) => {
    if (layer instanceof VectorLayer) {
        return "VectorLayer";
    } else if (layer instanceof ImageLayer) {
        return "ImageLayer";
    } else if (layer instanceof TileLayer) {
        return "TileLayer";
    } else if (layer instanceof Group) {
        return "Group";
    } else {
        return "BaseLayer";
    }
};


/**
 * @description
 * get options of BaseLayer
 *
 * @param {BaseLayer} layer openlayers BaseLayer.
 * @return {BaseLayerOptions}
 * */
export const getOptionsFromBaseLayer = (layer: BaseLayer): BaseLayerOptions => ({
    className: layer.getClassName(),
    opacity: layer.getOpacity(),
    visible: layer.getVisible(),
    extent: layer.getExtent(),
    zIndex: layer.getZIndex(),
    minResolution: layer.getMinResolution(),
    maxResolution: layer.getMaxResolution(),
    minZoom: layer.getMinZoom(),
    maxZoom: layer.getMaxZoom(),
});

/**
 * @param {BaseLayer} layer the layer.
 * @param {BaseLayerOptions} opts the options which to be assign to the layer.
 * @param {Map} olmap the map contains the layer and to fire events if exists.
 * @return {void}
 * */
export const setBaseLayerFromOptions = (layer: BaseLayer, opts: BaseLayerOptions, olmap ?: Map) => {

    const {opacity,visible,extent,zIndex,minResolution, maxResolution, minZoom, maxZoom} = opts;

    opacity && layer.setOpacity(opacity);
    layer.setVisible(Boolean(visible));
    extent && layer.setExtent(extent);
    zIndex && layer.setZIndex(zIndex);
    minResolution && layer.setMinResolution(minResolution);
    maxResolution && layer.setMaxResolution(maxResolution);
    minZoom && layer.setMinZoom(minZoom);
    maxZoom && layer.setMaxZoom(maxZoom);

    if(olmap) {
        olmap.dispatchEvent(String(OlMapLayerEventType.LAYER_PROP_CHANGE));
    }

};
