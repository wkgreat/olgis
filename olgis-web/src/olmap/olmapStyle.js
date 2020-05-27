/**
 * Map Style
 * */
import Style from "ol/style/Style";
import {Circle, Fill, RegularShape, Stroke} from "ol/style";
import stylefunction from "ol-mapbox-style/dist/stylefunction";

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
export const getPointRegularShapeStyle = (props) => new Style({image: getPointRegularShapeImage(props)});
export const getPointRegularShapeImage = (props) => {
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
export const getStrokeStyle = (props) => new Style({stroke: getStroke(props)});
export const getStroke = (props) => {
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

export const getFill = (props) => {
    const color = props.color || [98, 230, 220, 0.5];
    return new Fill({
        color
    })
};

/**
 *
 * */
export const rgbArrayToObject = (rgb) => {
    if ((typeof rgb) == 'object') {
        return {r: rgb[0], g: rgb[1], b: rgb[2], a: rgb[3]};
    } else {
        return rgb;
    }

};
export const rgbObjectToArray = (rgb) => {
    return Object.values(rgb);
};


export const applyMapboxStyleURL = (layer, url) => {
    fetch(url).then((res)=>{
        res.json().then(data=>{
            applyMapboxStyleJson(layer,data,'states');
        });

    },(err)=>{
        console.log(err);
    })
};

export const applyMapboxStyleJson = (layer,json,source) => {
    let theStyleFunc;
    theStyleFunc = stylefunction(layer,json,source);
    return theStyleFunc;
};
