import Draw, {Options as DrawOptions} from "ol/interaction/Draw";
import {getArea, getLength} from "ol/sphere";
import VectorSource from "ol/source/Vector";
import {arrayContains} from "../utils";
import GeometryType from "ol/geom/GeometryType";
import {Feature, MapBrowserPointerEvent, PluggableMap} from "ol";
import {Fill, Stroke, Style, Text} from "ol/style";
import {degree2Radian, meter2imperial, meter2kilometer, meter2nautical, radian2Degree} from "../units";
import {Geometry, Point} from "ol/geom";
import EventType from "ol/events/EventType";

/**
 * 测量类型
 * length: 线段长度
 * path: 多段线长度
 * area: 面积
 * angle: 夹角角度
 * true_azimuth: 真方位角
 * magnetic_azimuth: 磁方位角
 * */
export type MeasureType = 'line' | 'path' | 'area' | 'angle' | 'true_azimuth' | 'magnetic_azimuth'

/**
 * 测量单位
 * @enum
 * */
export enum Units {
    /** 米 */
    METER = "Meter(米)",
    /** 公里 */
    KILOMETER = "Kilometer(公里)",
    /** 英里 */
    IMPERIAL = "Imperial(英里)",
    /** 海里 */
    NAUTICAL = "Nautical(海里)",

    /** 平方米 */
    METER2 = "Square Meter(平方米)",
    /** 平方公里 */
    KILOMETER2 = "Square Kilometer(平方公里)",
    /** 平方英里 */
    IMPERIAL2 = "Square Imperial(平方英里)",
    /** 平方海里 */
    NAUTICAL2 = "Square Nautical(平方海里)",

    /** 角度 */
    DEGREE = "degree(角度)",
    /** 弧度 */
    RADIAN = "radian(弧度)"


}

/**
 * @interface
 * 测量结果
 * */
export interface MeasureResult {
    /** 测量数值 */
    value : number,
    /** 测量类型 */
    measureType : MeasureType,
    /** 测量单位 */
    unit : Units,
    /** 测量的要素*/
    feature?: Feature
}

type MeasureCallback = (result:MeasureResult) => void

/**
 * @interface
 * 测量交互工具属性
 * */
export interface MeasureOptions extends Omit<DrawOptions, "type">{
    /** 测量类型 */
    measureType : MeasureType
    /** 测量单位 */
    unit ?: Units
    /** 测量结果回调函数 */
    measureCallback ?: MeasureCallback
}

/**
 * @classdesc
 * openlayers 测量交互工具(Measure), 继承自{@link Draw}交互工具
 * TODO 2 考虑坐标系转换
 * TODO 5 如果是地理坐标系，是否绘制大圆线
 * */
class Measure extends Draw {

    measureType_ ?: MeasureType = "line";
    unit_ ?: Units = Units.METER;
    lastMap_ ?: PluggableMap;

    measureCallback_ ?: MeasureCallback;
    source_ ?: VectorSource;

    constructor(options: MeasureOptions) {
        super(drawOptions(options));
        this.source_ = options.source;
        this.measureType_ = options.measureType;
        const units = unitsOfMeasureType(options.measureType);
        if(options.unit) {
            if(arrayContains(units, options.unit)) {
                this.unit_ = options.unit;
            } else {
                this.unit_ = units[0];
            }
        } else {
            this.unit_ = units[0];
        }
        if(options.measureCallback) {
            this.measureCallback_ = options.measureCallback
        }

    }

    protected handleMoveEvent(mapBrowserEvent: MapBrowserPointerEvent): void {
        super.handleMoveEvent(mapBrowserEvent);
        const overlay = this.getOverlay();
        const features = overlay.getSource().getFeatures();
        if(features && features.length>0) {
            const feature = features[features.length-1];
            this.measureFeature(feature);
        }
    }

    finishDrawing(): void {
        super.finishDrawing();
        this.measureLastFinishedFeature();
    }

    getLastFinishedFeature(): Feature | undefined {
        const features = this.source_?.getFeatures();
        if(!features || features.length===0) {
            return undefined;
        }
        return features[features.length-1];
    }

    measureFeature(feature?: Feature, style?:Style): MeasureResult|undefined {
        let result: MeasureResult|undefined = undefined;
        if(feature) {
            const geom = feature.getGeometry();
            if(geom instanceof Point) {
                return undefined;
            }
            geom.on(EventType.CHANGE,()=>{
                const result = this.measureGeom(geom,this.measureType_,this.unit_);
                this.setResultStyle(feature, result, style);
                if(this.measureCallback_ && result) {
                    this.measureCallback_({
                        ...result,
                        feature: feature
                    });
                }
            });
        }
        return result
    }

    measureGeom(geom:Geometry, measureType?: MeasureType, unit?: Units):MeasureResult {
        let result: MeasureResult|undefined = undefined;
        let value: number = 0;
        if(measureType==="line" || measureType==="path") {
            value = getLength(geom);
        } else if(measureType==="area") {
            value = getArea(geom);
        } else {
            value = 0.0;
        }
        if(measureType==="line" || measureType==="path") {
            value = unitConversion(value, Units.METER, unit as Units);
        } else if (measureType==="area") {
            value = unitConversion(value, Units.METER2, unit as Units);
        } else {
            //TODO 确定测量初始单位
            value = unitConversion(value, Units.RADIAN, unit as Units);
        }
        result = {
            value,
            measureType: measureType as MeasureType,
            unit: unit as Units,
        };
        return result;
    }

    measureLastFinishedFeature() {
        const feature = this.getLastFinishedFeature();
        this.measureFeature(feature);
    }

    setResultStyle(feature: Feature, result: MeasureResult, style?:Style) {

        const content =
            `测量类型(Type):${result.measureType}\n测量值(Value):${result.value}\n单位(Unit):${result.unit}`;

        const text = new Text({
            text: content,
            font: "15px Arial",
            textAlign: "left",
            offsetX: 0,
            offsetY: 0,
            overflow: true,
            padding: [10,10,10,10],
            fill: new Fill({
                color: "black"
            }),
            backgroundFill: new Fill({
                color: "rgba(247,255,8,0.61)"
            })
        });


        let theStyle: Style;
        if(style) {
            theStyle = style.clone();
            theStyle.setText(text)
        } else {
            theStyle = new Style({
                stroke: new Stroke({
                    color: "rgb(22,0,255)",
                    width: 2
                }),
                fill: new Fill({
                    color: "rgba(0,138,255,0.51)"
                }),
                text
            });
        }

        feature.setStyle(theStyle);

    }

}
export default Measure;

/**
 * @private
 * */
function drawOptions(measureOptions: MeasureOptions): DrawOptions {
    const mt = measureOptions.measureType;
    if(mt=="line") {
        measureOptions.maxPoints=2;
    }
    if(mt==="angle" || mt==="magnetic_azimuth" || mt==="true_azimuth"
    ) {
        measureOptions.maxPoints=3;
        measureOptions.freehand=false;
    }
    return {
        type : chooseDrawType(measureOptions),
        ...measureOptions
    }
}

/**
 * @private
 * */
function chooseDrawType(measureOptions: MeasureOptions): GeometryType {
    if(measureOptions.measureType==="area") {
        return GeometryType.POLYGON;
    } else {
        return GeometryType.LINE_STRING;
    }
}

/**
 * 获取测量类型支持的单位
 * @param measureType 测量类型
 * @returns 支持的单位列表
 * */
export function unitsOfMeasureType(measureType: MeasureType): Units[] {
    if(measureType==="line"||measureType==="path" ){
        return [Units.METER,Units.KILOMETER,Units.IMPERIAL,Units.NAUTICAL]
    } else if (measureType==="area") {
        return [Units.METER2,Units.KILOMETER2,Units.IMPERIAL2,Units.NAUTICAL2]
    } else {
        return [Units.DEGREE, Units.RADIAN];
    }
}

export function unitConversion(value: number, from: Units, to: Units) {
    if(from===to) {
        return value;
    }
    if(from===Units.METER) {
        if(to===Units.KILOMETER) {
            return meter2kilometer(value);
        }
        if(to===Units.IMPERIAL) {
            return meter2imperial(value);
        }
        if(to===Units.NAUTICAL) {
            return meter2nautical(value);
        }
    }
    if(from===Units.METER2) {
        if(to===Units.KILOMETER2) {
            return Math.pow(meter2kilometer(Math.sqrt(value)),2);
        }
        if(to===Units.IMPERIAL2) {
            return Math.pow(meter2imperial(Math.sqrt(value)),2);
        }
        if(to===Units.NAUTICAL2) {
            return Math.pow(meter2nautical(Math.sqrt(value)),2);
        }
    }
    if(from===Units.DEGREE && to===Units.RADIAN) {
        return degree2Radian(value);
    }
    if(from===Units.RADIAN && to===Units.DEGREE) {
        return radian2Degree(value);
    }
    throw Error("unitConversion unsupported units");
}