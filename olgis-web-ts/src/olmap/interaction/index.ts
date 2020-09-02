import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {StyleUtils} from "../index";
import {genLayerName} from "../olmapLayer";
import Draw, {Options as DrawOptions} from "ol/interaction/Draw";
import {Map} from "ol";
import {StyleLike} from "ol/style/Style";

export {default as Measure} from "./Measure"

export interface DrawLayer {
    draw : Draw,
    layer: VectorLayer
}

/**
 * 使用新图层创建绘制交互
 * @function
 * @param map 地图对象
 * @param drawOptions 绘制交互对象属性
 * @param layerName 图层名称
 * @param style 图层样式
 * @returns 绘制交互对象及对应图层
 * */
export function makeDrawWithNewLayer(map: Map, drawOptions: DrawOptions, layerName ?: string, style ?: StyleLike): DrawLayer {

    const source = new VectorSource();

    const layer = new VectorLayer({
        source: source,
        style: style || StyleUtils.getDefaultStyle()
    });

    layer.set('name', genLayerName(map, layerName || "draw"));

    drawOptions.source = source;

    const draw = new Draw(drawOptions);

    return {
        draw,layer
    };

};

