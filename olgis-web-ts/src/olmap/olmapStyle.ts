/**
 * Map Style
 * */
import Style, {Options} from "ol/style/Style";
import {Circle, Fill, RegularShape, Stroke} from "ol/style";
// import stylefunction from "ol-mapbox-style/dist/stylefunction";
import BaseLayer from "ol/layer/Base";
import VectorTileLayer from "ol/layer/VectorTile";
import {Source} from "ol/source";

type AnyStyleProps = {[key:string]:any}
export type Color =  number[] | string;

/**
 * default Point Style
 * */
export const defaultPointStyle = new Style({

    image: new Circle({
        fill: new Fill({color: 'red'}),
        stroke: new Stroke({color: 'blue', width: 2}),
        radius: 5

    })

});

export const getDefaultStyle = () => {
    return new Style({
        image: getPointRegularShapeImage({}),
        stroke: getStroke({}),
        fill: getFill({})
    });
};

/**
 * get a regular shape point style from props
 * @param {object} props
 * @returns {Style}
 */
export const getPointRegularShapeStyle = (props:AnyStyleProps) => new Style({image: getPointRegularShapeImage(props)});
export const getPointRegularShapeImage = (props:AnyStyleProps) => {
    const
        points = props.points || 0,
        radius = props.radius || 10,
        angle = props.angle || 0,
        rotation = props.rotation || 0,
        fillColor = props.fillColor || [98, 230, 220, 0.5],
        strokeColor = props.strokeColor || 'blue',
        strokeWidth = props.strokeWidth || 2;

    if (points <= 0) {
        return new Circle({
            fill: new Fill({color: fillColor}),
            stroke: new Stroke({color: strokeColor, width: strokeWidth}),
            radius
        });
    } else {
        return new RegularShape({
            points,
            angle,
            rotation,
            fill: new Fill({color: fillColor}),
            stroke: new Stroke({color: strokeColor, width: strokeWidth}),
            radius
        });
    }
};

/**
 * get a stoke style from props
 * */
export const getStrokeStyle = (props:AnyStyleProps) => new Style({stroke: getStroke(props)});
export const getStroke = (props:AnyStyleProps) => {
    const
        color = props.color || 'blue',
        width = props.width || 3,
        lineCap = props.lineCap || 'round',
        lineJoin = props.lineJoin || 'round',
        lineDash = props.lineDash || undefined,
        lineDashOffset = props.lineDashOffset || 0,
        miterLimit = props.miterLimit || 10;
    return new Stroke({
        color, width, lineCap, lineJoin, lineDash, lineDashOffset, miterLimit
    });
};

export const getFill = (props:AnyStyleProps) => {
    const color = props.color || [98, 230, 220, 0.5];
    return new Fill({
        color
    })
};



/**
 *
 * */
export const rgbArrayToObject = (rgb:Color) => {
    if ((typeof rgb) === 'object') {
        let _rgb  = rgb as number[];
        return {r: _rgb[0], g: _rgb[1], b: _rgb[2], a: _rgb[3]};
    } else {
        return rgb;
    }

};
export const rgbObjectToArray = (rgb:Color) => {
    return Object.values(rgb);
};


export const applyMapboxStyleURL = (layer:VectorTileLayer, url:string) => {
    fetch(url).then((res)=>{
        res.json().then(data=>{
            applyMapboxStyleJson(layer,data,'states');
        });

    },(err)=>{
        console.log(err);
    })
};

export const applyMapboxStyleJson = (layer:VectorTileLayer,json:Object,source:string) => {
    let theStyleFunc;
    //TODO
    //theStyleFunc = stylefunction(layer,json,source);
    return theStyleFunc;
};
