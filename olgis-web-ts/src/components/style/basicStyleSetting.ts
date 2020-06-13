import {BoxProps, PaperProps} from "@material-ui/core";
import {Fill, Icon, Stroke, RegularShape, Circle, Text} from "ol/style";
import Style, {Options as StyleOptions} from "ol/style/Style";
import {Options as FillOptions} from "ol/style/Fill";
import {Options as StrokeOptions} from "ol/style/Stroke";
import {Options as IconOptions} from "ol/style/Icon";
import {Options as RegularShapeOptions} from 'ol/style/RegularShape';
import {Options as CircleOptions} from "ol/style/Circle";
import {Options as TextOptions} from "ol/style/Text";

export type BasicStyle = Fill | Stroke | RegularShape | Circle | Icon | Text | Style
export type BasicStyleOptions = FillOptions | StrokeOptions | CircleOptions | IconOptions | TextOptions | StyleOptions

export interface BasicStyleSettingProps<T extends BasicStyle, O extends BasicStyleOptions> {

    /**
     * whether open(show) this FillSetting
     * */
    open ?: true

    /**
     * Style | Style Options to initialize the Fill Options value
     * */
    style ?: T | O

    /**
     * callback on the setting change
     * */
    onChange ?: (options: O) => void,

    /**
     * css of box(div)
     * */
    paperProps ?: PaperProps,

    /**
     * title
     * */
    title ?: string

}

export type StyleIncludeColor = Fill | Stroke | Icon;
export type OptionsIncludeColor = FillOptions | StrokeOptions | IconOptions;

//TODO analyze the colorLike type
export const getColor = (style ?: StyleIncludeColor | OptionsIncludeColor) => {
    let theColor;
    if(!style) {
        return '#ffffff';
    }
    if((<StyleIncludeColor> style).getColor) {
        theColor = (<StyleIncludeColor> style).getColor();
    } else if((<OptionsIncludeColor> style).color) {
        theColor = (<OptionsIncludeColor> style).color;
    }
    if(theColor instanceof Array) {
        return theColor;
    } else {
        return '#ffffff';
    }

};

export const getOptionsFromRegularShape = (regularShape: RegularShape): RegularShapeOptions => ({

    fill: regularShape.getFill(),
    points: regularShape.getPoints(),
    radius: regularShape.getRadius(),
    radius1: regularShape.getRadius(),
    radius2: regularShape.getRadius2(),
    angle: regularShape.getAngle(),
    displacement: regularShape.getDisplacement(),
    stroke: regularShape.getStroke(),
    rotation: regularShape.getRotation(),
    rotateWithView: regularShape.getRotateWithView()

});

export const getOptionsFromStroke = (stroke: Stroke): StrokeOptions => ({
    color: stroke.getColor(),
    lineCap: stroke.getLineCap(),
    lineJoin: stroke.getLineJoin(),
    lineDash: stroke.getLineDash(),
    lineDashOffset: stroke.getLineDashOffset(),
    miterLimit: stroke.getMiterLimit(),
    width: stroke.getWidth()
});