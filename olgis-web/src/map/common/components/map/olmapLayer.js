/**
 * @file openlayers 地图接口
 */
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

import mbStyle from '../../../static/style';
import GeoJSON from "ol/format/GeoJSON";

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
export const genLayerName = (olmap, name) => {
    name = name || "layer";
    const layersNames = olmap.getLayers().getArray().map(l => l.get('name'));
    return layersNames.includes(name) ? name + "_" + layerIDGen.next().value : name;
};

/**
 * 使用提供的xyz瓦片的url生成图层
 * @param olmap 地图对象
 * @param name 图层名称
 * @param url 瓦片xyz的URL
 * @returns 瓦片图层对象
 */
export const makeXYZLayer = (olmap, name, url) => {
    return new TileLayer({
        name: genLayerName(olmap, name),
        source: new XYZ({
            url
        })
    });
};
/**
 *
 * 使用pbf的VectorTile瓦片 (MVT)
 * */
export const makeXYZVectorLayer = (olmap, name, url) => {
    let theLayer = new VectorTileLayer({
        name: genLayerName(olmap, name),
        declutter: true,
        source: new VectorTile({
            format: new MVT(),
            tileGrid: createXYZ({maxZoom:17}),
            tilePixelRatio: 1,
            url
        })
    });
    STYLE.applyMapboxStyleJson(theLayer,mbStyle,"composite");
    return theLayer;
};

/**
 * 获取地图中指定名称的图层对象
 */
export const findLayerByName = (olmap, name) => {
    return olmap.getLayers().getArray().find(layer => layer.get('name') === name);
};

/**
 * 得到指定名字的图层index，相当于图层在地图中的顺序
 */
export const findLayerIndexByName = (olmap, name) => {
    return olmap.getLayers().getArray().findIndex(layer => layer.get('name') === name);
};

/**
 * 删除指定名字的图层
 */
export const removeLayerByName = (olmap, name) => {

    const layer = findLayerByName(olmap, name);
    if (layer) {
        olmap.removeLayer(layer);
    }

};

/**
 * 重命名图层
 */
export const renameLayer = (olmap, name1, name2) => {

    const layer = findLayerByName(olmap, name1);
    if (layer && name2) {
        const newName = genLayerName(olmap, name2);
        layer.set("name", newName);
    }

};

/**
 * 设置指定名字的图层的属性
 */
export const setLayerProps = (olmap, name, props) => {
    const layer = findLayerByName(olmap, name);
    if (layer) {
        layer.setProperties(props);
    }
};

export const makeVectorLayer = (olmap, name) => {
    let source = new VectorSource();
    return new VectorLayer({
        source: source,
        name: genLayerName(olmap, name),
        style: STYLE.getDefaultStyle()
    });
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
export const makeCSVLayer = (olmap, name, csv, fieldIndex) => {

    const features = csv
        .split("\n") //拆分行
        .slice(1) //去掉第一行
        .filter(s => s != null && s.length > 0) //去掉空行
        .map(r => {
            const values = r.split(",");
            const lon = values[fieldIndex['lon']] * 1.0;
            const lat = values[fieldIndex['lat']] * 1.0;
            const timeIndex = fieldIndex['time'] * 1;
            const time = (timeIndex < 0) ? '' : values[timeIndex];
            return new Feature({
                geometry: new Point(fromLonLat([lon, lat])),
                name: time
            });
        });

    return new VectorLayer({
        source: new VectorSource({
            features
        }),
        name: genLayerName(olmap, name),
        style: STYLE.getDefaultStyle()
    });

};

export const makeWKTLayer = (olmap, name, wkts) => {
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
    return new VectorLayer({
        source: new VectorSource({
            features
        }),
        name: genLayerName(olmap, name),
        style: STYLE.getDefaultStyle()
    });
};

export const makeGeoJsonLayer = (olmap, name, geojson) => {
    let geojsonFormat = new GeoJSON();
    geojson = geojson.trim();
    if(!geojson) {
        return null;
    }
    let features = geojsonFormat.readFeatures(geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    });
    return new VectorLayer({
        source: new VectorSource({
            features
        }),
        name: genLayerName(olmap, name),
        style: STYLE.getDefaultStyle()
    });
};

/**
 * 图层上移一层
 * @param olmap 地图对象
 * @param name 要移动的图层名称
 */
export const layerUp = (olmap, name) => {
    const layerIndex = findLayerIndexByName(olmap, name);
    const layerNums = olmap.getLayers().getLength();
    if (layerIndex !== -1 && layerIndex < layerNums - 1) {
        const theLayer = olmap.getLayers().item(layerIndex);
        olmap.removeLayer(theLayer);
        olmap.getLayers().insertAt(layerIndex + 1, theLayer);
    }
};

/**
 * 图层下移一层
 * @param olmap 地图对象
 * @param name 要移动的图层名称
 */
export const layerDown = (olmap, name) => {
    const layerIndex = findLayerIndexByName(olmap, name);
    if (layerIndex > 0) {
        const theLayer = olmap.getLayers().item(layerIndex);
        olmap.removeLayer(theLayer);
        olmap.getLayers().insertAt(layerIndex - 1, theLayer);
    }
};

/**
 * 缩放至某图层
 * @param olmap 地图对象
 * @param name 缩放的目标图层
 */
export const zoomToLayer = (olmap, name) => {
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
export const getLayerType = layer => {
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